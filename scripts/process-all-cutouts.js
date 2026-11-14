const { AutoModel, AutoProcessor, RawImage } = require('@xenova/transformers');
const path = require('path');

const PERSONAS = [
  { in: 'real_charmer_v3.jpg', out: 'cutout_charmer.png' },
  { in: 'real_negotiator_v3.jpg', out: 'cutout_negotiator.png' },
  { in: 'real_detective_v3.jpg', out: 'cutout_detective.png' },
  { in: 'real_leader_v3.jpg', out: 'cutout_leader.png' },
  { in: 'real_heart_reader_v3.jpg', out: 'cutout_heart_reader.png' }
];

async function processAll() {
  console.log('Loading RMBG-1.4 model...');
  const model = await AutoModel.from_pretrained('briaai/RMBG-1.4');
  const processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4');

  for (const item of PERSONAS) {
    const inputPath = path.join(__dirname, '../public/images/thepeoplelanguage', item.in);
    const outPath = path.join(__dirname, '../public/images/thepeoplelanguage', item.out);
    console.log(`\n--- Processing ${item.in} -> ${item.out} ---`);

    const image = await RawImage.read(inputPath);
    console.log(`Original: ${image.width}x${image.height}`);

    const { pixel_values } = await processor(image);
    const { output } = await model({ input: pixel_values });

    const maskData = output[0].data;
    const maskDims = output[0].dims;
    const maskHeight = maskDims[2] || 1024;
    const maskWidth = maskDims[3] || 1024;

    const maskBytes = new Uint8ClampedArray(maskWidth * maskHeight);
    for (let i = 0; i < maskData.length; i++) {
      maskBytes[i] = Math.round(Math.min(Math.max(maskData[i], 0), 1) * 255);
    }

    const maskRaw = new RawImage(maskBytes, maskWidth, maskHeight, 1);
    const resizedMask = await maskRaw.resize(image.width, image.height);

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
      // Clean smooth alpha
      rgbaData[destIdx + 3] = alpha > 10 ? alpha : 0;

      if (alpha > 30) {
        const x = i % image.width;
        const y = Math.floor(i / image.width);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    const uncropped = new RawImage(rgbaData, image.width, image.height, 4);

    // Generous padding around the detected body
    const padX = Math.round((maxX - minX) * 0.04);
    const padY = Math.round((maxY - minY) * 0.03);

    // CRITICAL FIX: crop takes [x_min, y_min, x_max, y_max]! NOT [x, y, w, h]!
    const cropXMin = Math.max(0, minX - padX);
    const cropYMin = Math.max(0, minY - padY);
    const cropXMax = Math.min(image.width - 1, maxX + padX);
    const cropYMax = Math.min(image.height - 1, maxY + padY);

    console.log(`Body bounds: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
    console.log(`Cropping [x_min=${cropXMin}, y_min=${cropYMin}, x_max=${cropXMax}, y_max=${cropYMax}] (Width: ${cropXMax - cropXMin}, Height: ${cropYMax - cropYMin})`);

    const cropped = await uncropped.crop([cropXMin, cropYMin, cropXMax, cropYMax]);
    await cropped.save(outPath);
    console.log(`SUCCESS! Saved: ${item.out}`);
  }

  console.log('\nAll 5 transparent cutouts fixed and generated successfully!');
}

processAll().catch(console.error);
