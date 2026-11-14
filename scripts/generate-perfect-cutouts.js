const { AutoModel, AutoProcessor, RawImage } = require('@xenova/transformers');
const path = require('path');
const fs = require('fs');

const PERSONAS = [
  { in: 'real_charmer_v3.jpg', out: 'cutout_charmer.png' },
  { in: 'real_negotiator_v3.jpg', out: 'cutout_negotiator.png', cleanStray: true },
  { in: 'real_detective_v3.jpg', out: 'cutout_detective.png' },
  { in: 'real_leader_v3.jpg', out: 'cutout_leader.png' },
  { in: 'real_heart_reader_v4.jpg', out: 'cutout_heart_reader.png' }
];

// Helper: Discard disconnected small components (like stray chair legs / reflections)
function keepLargestComponent(maskData, width, height) {
  const visited = new Uint8Array(width * height);
  let bestComponent = [];
  let bestSize = 0;

  // Find all components where mask > 30
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (maskData[idx] > 30 && !visited[idx]) {
        // BFS
        const queue = [idx];
        visited[idx] = 1;
        const currentComponent = [idx];

        let head = 0;
        while (head < queue.length) {
          const cur = queue[head++];
          const cx = cur % width;
          const cy = Math.floor(cur / width);

          // Check 4 neighbors
          const neighbors = [
            cy > 0 ? (cy - 1) * width + cx : -1,
            cy < height - 1 ? (cy + 1) * width + cx : -1,
            cx > 0 ? cy * width + (cx - 1) : -1,
            cx < width - 1 ? cy * width + (cx + 1) : -1
          ];

          for (const n of neighbors) {
            if (n !== -1 && maskData[n] > 30 && !visited[n]) {
              visited[n] = 1;
              queue.push(n);
              currentComponent.push(n);
            }
          }
        }

        if (currentComponent.length > bestSize) {
          bestSize = currentComponent.length;
          bestComponent = currentComponent;
        }
      }
    }
  }

  // Create clean mask keeping only components that have significant size (> 5% of main body)
  const cleanMask = new Uint8ClampedArray(width * height);
  // Re-run with component filtering: keep components that are at least 3% of the main body
  // Reset visited
  visited.fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (maskData[idx] > 30 && !visited[idx]) {
        const queue = [idx];
        visited[idx] = 1;
        const comp = [idx];
        let head = 0;
        while (head < queue.length) {
          const cur = queue[head++];
          const cx = cur % width;
          const cy = Math.floor(cur / width);
          const neighbors = [
            cy > 0 ? (cy - 1) * width + cx : -1,
            cy < height - 1 ? (cy + 1) * width + cx : -1,
            cx > 0 ? cy * width + (cx - 1) : -1,
            cx < width - 1 ? cy * width + (cx + 1) : -1
          ];
          for (const n of neighbors) {
            if (n !== -1 && maskData[n] > 30 && !visited[n]) {
              visited[n] = 1;
              queue.push(n);
              comp.push(n);
            }
          }
        }

        // If component is at least 5% of bestSize, keep it
        if (comp.length >= bestSize * 0.05) {
          for (const p of comp) {
            cleanMask[p] = maskData[p];
          }
        }
      }
    }
  }

  return cleanMask;
}

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

    // Apply connected component cleaning to eliminate stray lines/artifacts
    const cleanedMask = keepLargestComponent(resizedMask.data, image.width, image.height);

    const numPixels = image.width * image.height;
    const rgbaData = new Uint8ClampedArray(numPixels * 4);

    let minX = image.width, maxX = 0, minY = image.height, maxY = 0;

    for (let i = 0; i < numPixels; i++) {
      const alpha = cleanedMask[i];
      const srcIdx = i * image.channels;
      const destIdx = i * 4;

      rgbaData[destIdx] = image.data[srcIdx];
      rgbaData[destIdx + 1] = image.data[srcIdx + 1];
      rgbaData[destIdx + 2] = image.data[srcIdx + 2];
      // Clean smooth alpha
      rgbaData[destIdx + 3] = alpha > 15 ? alpha : 0;

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

    // Padding around body
    const padX = Math.round((maxX - minX) * 0.03);
    const padY = Math.round((maxY - minY) * 0.02);

    const cropXMin = Math.max(0, minX - padX);
    const cropYMin = Math.max(0, minY - padY);
    const cropXMax = Math.min(image.width - 1, maxX + padX);
    const cropYMax = Math.min(image.height - 1, maxY + padY);

    console.log(`Cleaned Body bounds: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
    console.log(`Cropping [${cropXMin}, ${cropYMin}, ${cropXMax}, ${cropYMax}] (Width: ${cropXMax - cropXMin}, Height: ${cropYMax - cropYMin})`);

    const cropped = await uncropped.crop([cropXMin, cropYMin, cropXMax, cropYMax]);
    await cropped.save(outPath);
    console.log(`SAVED CLEAN CUTOUT: ${item.out}`);
  }

  console.log('\nAll cutouts perfected!');
}

processAll().catch(console.error);
