const { AutoModel, AutoProcessor, RawImage } = require('@xenova/transformers');
const path = require('path');

async function removeBg(inputFilename, outputFilename) {
  console.log('Loading RMBG-1.4 model...');
  const model = await AutoModel.from_pretrained('briaai/RMBG-1.4');
  const processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4');

  const inputPath = path.join(__dirname, '../public/images/thepeoplelanguage', inputFilename);
  console.log('Reading:', inputPath);
  const image = await RawImage.read(inputPath);

  console.log(`Original dimensions: ${image.width}x${image.height}, channels: ${image.channels}`);
  console.log('Running model...');
  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });

  // Convert tensor output to mask
  const maskData = output[0].data; // Float32Array between 0 and 1
  const maskDims = output[0].dims;
  const maskHeight = maskDims[2] || 1024;
  const maskWidth = maskDims[3] || 1024;

  const maskBytes = new Uint8ClampedArray(maskWidth * maskHeight);
  for (let i = 0; i < maskData.length; i++) {
    // 0 is transparent background, 1 is foreground person
    const val = Math.round(Math.min(Math.max(maskData[i], 0), 1) * 255);
    maskBytes[i] = val;
  }

  // Create grayscale mask RawImage and resize to original image dimensions
  const maskRaw = new RawImage(maskBytes, maskWidth, maskHeight, 1);
  const resizedMask = await maskRaw.resize(image.width, image.height);

  console.log('Compositing RGBA cutout...');
  const numPixels = image.width * image.height;
  const rgbaData = new Uint8ClampedArray(numPixels * 4);

  let minX = image.width, maxX = 0, minY = image.height, maxY = 0;

  for (let i = 0; i < numPixels; i++) {
    const alpha = resizedMask.data[i];
    const srcIdx = i * image.channels;
    const destIdx = i * 4;

    rgbaData[destIdx] = image.data[srcIdx];
    rgbaData[destIdx + 1] = image.data[srcIdx + 1];
    rgbaData[destIdx + 2] = image.data[srcIdx + 2];
    rgbaData[destIdx + 3] = alpha > 15 ? alpha : 0; // Cut off noise

    if (alpha > 40) {
      const x = i % image.width;
      const y = Math.floor(i / image.width);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const uncropped = new RawImage(rgbaData, image.width, image.height, 4);

  // Add 2% padding around the bounding box
  const padX = Math.round((maxX - minX) * 0.02);
  const padY = Math.round((maxY - minY) * 0.02);
  const cropX = Math.max(0, minX - padX);
  const cropY = Math.max(0, minY - padY);
  const cropW = Math.min(image.width - cropX, (maxX - minX) + padX * 2);
  const cropH = Math.min(image.height - cropY, (maxY - minY) + padY * 2);

  console.log(`Cropping body bounding box: x=${cropX}, y=${cropY}, w=${cropW}, h=${cropH}`);
  const cropped = await uncropped.crop([cropX, cropY, cropW, cropH]);

  const outPath = path.join(__dirname, '../public/images/thepeoplelanguage', outputFilename);
  await cropped.save(outPath);
  console.log('SUCCESS! Saved transparent body cutout to:', outPath);
}

removeBg('real_charmer_v3.jpg', 'cutout_charmer.png').catch(console.error);
