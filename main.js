const worker = new Worker('./worker.js');

const imageData = new ImageData(1920, 1080);

let running = false;
let closeImageBitmap = true;
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
      imageBitmap,
      closeImageBitmap
    }, [ imageBitmap ]);
  } else {
    worker.postMessage({
      message: 'PING',
      type: 'background',
      closeImageBitmap
    });
  }

  if (mode === 'main' && closeImageBitmap) {
    imageBitmap.close();
  }
}

worker.onmessage = () => {
  if (running) {
    sendMessage();
  }
};

document.getElementById('close').onchange = (event) => {
  closeImageBitmap = event.target.checked;
};

Array.from(document.querySelectorAll('[name="mode"]')).map(control => {
  control.onchange = event => {
    mode = event.target.value;
  };
});

document.getElementById('action').onclick = () => {
  running = !running;

  if (running) {
    document.getElementById('action').innerText = 'Stop';

    // Start the infinite run
    sendMessage();
  } else {
    document.getElementById('action').innerText = 'Start';
  }
};
