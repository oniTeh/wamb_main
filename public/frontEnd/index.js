const socketUrl = document.getElementById('url').value;
const url =`${socketUrl}`;
const socket = io()


socket.on("hello from server", (...args) => {
  // ...
  console.log({},...args)
});

socket.on('message',(data)=>{
    console.log(data)
})

socket.on('qrcode',(qrcode)=>{
    const qrcodeImage = document.getElementById('qrcodeImage');
    console.log(qrcode);
    qrcodeImage.setAttribute('src',qrcode)
})

socket.on('WHATSAPPMESSAGE',(data)=>{
    console.log("whatsappMessage",JSON.stringify(data))
})

socket.on('Authenticated',(data)=>{
    console.log('authinticated',data.toString())
})

socket.emit('message',"hell world")
