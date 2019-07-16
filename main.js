const worker = new Worker('./worker.js');

const imageData = new ImageData(3840, 2160);

let running = false;
let mode = 'background';

async function sendMessage () {
  let imageBitmap;

  if (mode === 'transfer' || mode === 'main') {
    imageBitmap = await createImageBitmap(imageData);
  }

  if (mode === 'main') {
    worker.postMessage({
      message: 'PING',
      type: 'noop'
    });
  } else if (mode === 'transfer') {
    worker.postMessage({
      message: 'PING',
      type: 'noop',
      imageBitmap
    }, [ imageBitmap ]);
  } else {
    worker.postMessage({
      message: 'PING',
      type: 'background'
    });
  }
}

worker.onmessage = () => {
  if (running) {
    sendMessage();
  }
};

document.getElementById('[name="mode"]').onchange = (event) => {
  mode = event.target.value;
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
