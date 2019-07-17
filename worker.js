const imageData = new ImageData(3840, 2160);
let lastImageBitmap = null;

function pong () {
  postMessage('PONG')
}

onmessage = async (event) => {
  const { type, closeImageBitmap } = event.data;

  if (type !== 'noop') {
    lastImageBitmap = await createImageBitmap(imageData);

    if (closeImageBitmap) {
      lastImageBitmap.close();
    }
  } else {
    const imageBitmap = event.data.imageBitmap;

    if (imageBitmap) {
      lastImageBitmap = imageBitmap;

      if (closeImageBitmap) {
        imageBitmap.close();
      }
    }
  }

  setTimeout(pong, 40);
}