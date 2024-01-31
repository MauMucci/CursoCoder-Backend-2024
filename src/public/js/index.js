//Cliente

const socket = io(); // instancia al socket y lo guarda en la variable
socket.emit("messageFromClient", "Enviado desde cliente");

socket.on("messageFromServer",data => {
    console.log('mensaje del servidor', data)
})
