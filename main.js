const worker = new Worker('./worker.js');

const imageData = new ImageData(1920, 1080);

const imageBitmaps = [];

let running = false;
let transfer = true;

async function sendImageBitmap () {
  const imageBitmap = await createImageBitmap(imageData);
  imageBitmaps.push(imageBitmap);

  if (imageBitmaps.length > 10) {
    imageBitmaps.shift();
  }

  let transferables = undefined;

  if (transfer) {
    transferables = [ imageBitmap ];
  }

  worker.postMessage({
    message: 'PING'
  });
}

worker.onmessage = () => {
  if (running) {
    sendImageBitmap();
  }
};

document.getElementById('transfer').onchange = (event) => {
  transfer = event.target.checked;
}

document.getElementById('action').onclick = () => {
  running = !running;

  if (running) {
    document.getElementById('action').innerText = 'Stop';

    // Start the infinite run
    sendImageBitmap();
  } else {
    document.getElementById('action').innerText = 'Start';
  }
}
