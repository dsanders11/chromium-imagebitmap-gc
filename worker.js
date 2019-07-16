const imageData = new ImageData(3840, 2160);

function pong () {
  postMessage('PONG')
}

onmessage = async (event) => {
  if (event.data.message !== 'transfer') {
    await createImageBitmap(imageData);
  }
  setTimeout(pong, 40);
}