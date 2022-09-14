
const {WebSocket} = require("ws");
    const mysocket = (app)=>{
    
        const wss = new WebSocket.Server({
            server:app,

          });

    
    
    
// wss.on("connection", function connection(ws, request, client) {
//     ws.send('hello world')
//     wss.on("message", function message(data, isBinary) {
    
//     // wss.clients.forEach(function each(client) {
//     //   if (client !== ws && client.readyState === WebSocket.OPEN) {
//     //     client.send(data, { binary: isBinary });
//     //   }
//     // });
//     console.log(mess)
//   });
// })

//   wss.on("upgrade", async function upgrade(request, socket, head) {
//     // verfify clinet here ()
//   //test for authentication and return if not valid here
//   // socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')
//   // return false

//     wss.handleUpgrade(request, socket, head, function done(ws) {
//         wss.emit('connection',ws,request,...argv)
//     });
//   })

  return wss

} 
   


  module.exports = {
      mysocket:mysocket
  }