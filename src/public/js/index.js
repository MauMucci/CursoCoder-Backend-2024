//Cliente

const socket = io(); // instancia al socket y lo guarda en la variable
socket.emit("message", "Comunicacion desde Websocket");
