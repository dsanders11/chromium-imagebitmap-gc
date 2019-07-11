const worker = new Worker('./worker.js');

const imageData = new ImageData(1920, 1080);

async function transferImageBitmap () {
  const imageBitmap = await createImageBitmap(imageData);

  worker.postMessage({
    imageBitmap
  }, [ imageBitmap ]);
}

worker.onmessage = () => {
  transferImageBitmap();
};

document.getElementById('start').onclick = () => {
  // Start the infinite run
  transferImageBitmap();
}
