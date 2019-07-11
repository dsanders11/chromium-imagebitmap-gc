onmessage = async () => {
  setTimeout(() => {
    postMessage('ACK')
  }, 40);
}