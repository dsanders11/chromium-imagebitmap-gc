const worker = new Worker('./worker.js');

const imageData = new ImageData(1920, 1080);

let running = false;

async function transferImageBitmap () {
  const imageBitmap = await createImageBitmap(imageData);

  worker.postMessage({
    imageBitmap
  }, [ imageBitmap ]);
}

worker.onmessage = () => {
  if (running) {
    transferImageBitmap();
  }
};

document.getElementById('action').onclick = () => {
  running = !running;

  if (running) {
    document.getElementById('action').innerText = 'Stop';

    // Start the infinite run
    transferImageBitmap();
  } else {
    document.getElementById('action').innerText = 'Start';
  }
}
