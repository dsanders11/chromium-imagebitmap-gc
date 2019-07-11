onmessage = async (event) => {
  // Dispose of the data, this should avoid
  // a major GC
  event.data.imageBitmap.close();

  setTimeout(() => {
    postMessage('ACK')
  }, 40);
}