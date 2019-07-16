const worker = new Worker('./worker.js');

const imageData = new ImageData(3840, 2160);

let running = false;
let transfer = false;

async function sendMessage () {
  if (transfer) {
    const imageBitmap = await createImageBitmap(imageData);

    worker.postMessage({
      message: 'PING',
      imageBitmap
    }, [ imageBitmap ]);
  } else {
    worker.postMessage({
      message: 'PING'
    });
  }
}

worker.onmessage = () => {
  if (running) {
    sendMessage();
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
    sendMessage();
  } else {
    document.getElementById('action').innerText = 'Start';
  }
}
