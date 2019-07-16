const imageData = new ImageData(3840, 2160);

function pong () {
  postMessage('PONG')
}

onmessage = async (event) => {
  const { type, closeImageBitmap } = event.data;

  if (type !== 'noop') {
    const imageBitmap = await createImageBitmap(imageData);

    if (closeImageBitmap) {
      imageBitmap.close();
    }
  } else {
    const imageBitmap = event.data.imageBitmap;

    if (imageBitmap && closeImageBitmap) {
      imageBitmap.close();
    }
  }

  setTimeout(pong, 40);
}