function ack () {
  postMessage('ACK')
}

onmessage = async (event) => {
  // Dispose of the data, this should avoid
  // a major GC
  event.data.imageBitmap.close();

  setTimeout(ack, 40);
}