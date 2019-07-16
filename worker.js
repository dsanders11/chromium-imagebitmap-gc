const imageData = new ImageData(3840, 2160);

function ack () {
  postMessage('PONG')
}

onmessage = async () => {
  await createImageBitmap(imageData);
  setTimeout(ack, 40);
}