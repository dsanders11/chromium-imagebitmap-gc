const imageData = new ImageData(1920, 1080);

function ack () {
  postMessage('PONG')
}

onmessage = async () => {
  await createImageBitmap(imageData);
  setTimeout(ack, 40);
}