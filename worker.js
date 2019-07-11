function ack () {
  postMessage('ACK')
}

onmessage = async (event) => {
  setTimeout(ack, 40);
}