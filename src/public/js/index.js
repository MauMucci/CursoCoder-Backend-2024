//Cliente

const socket = io(); // instancia al socket y lo guarda en la variable
socket.emit("saludo", "Enviado desde cliente");

socket.on("messageFromServer",data => {
    console.log('mensaje del cliente', data)
})


socket.emit('message',"Hola desde el cliente")
