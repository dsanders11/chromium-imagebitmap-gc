const imageData = new ImageData(1920, 1080);

const imageBitmaps = [];

function ack () {
  postMessage('ACK')
}

onmessage = async () => {
  imageBitmaps.push(await createImageBitmap(imageData));

  if (imageBitmaps.length > 10) {
    imageBitmaps.shift();
  }

  setTimeout(ack, 40);
}