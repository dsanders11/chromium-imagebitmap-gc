const imageBitmaps = [];

function ack () {
  postMessage('ACK')
}

onmessage = async (event) => {
  imageBitmaps.push(event.data.imageBitmap);

  if (imageBitmaps.length > 10) {
    imageBitmaps.shift();
  }

  setTimeout(ack, 40);
}