//Cliente
const socket = io();// instancia al socket y lo guarda en la variable

socket.emit('saludo',data => {
    console.log('hola desde cliente', data)
})
