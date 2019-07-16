const worker = new Worker('./worker.js');

let running = false;

async function sendMessage () {
  worker.postMessage({
    message: 'PING'
  });
}

worker.onmessage = () => {
  if (running) {
    sendMessage();
  }
};

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
