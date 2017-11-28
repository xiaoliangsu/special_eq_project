var ws;
function getWs(options) {
  if (!ws) {
    ws = new WebSocket(options)
  }
  return ws;
}
export default getWs;
