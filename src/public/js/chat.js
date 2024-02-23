const socket = io()
let user

document.getElementById("username-form").addEventListener("submit", (e) =>{
    e.preventDefault()
    const usernameInput = document.getElementById("username")
    const username = usernameInput.value
    
    
    Swal.fire({
        icon : "sucess",
        title: "Bienvenido al chat",
        text : `Estas conectado como ${username}`
    }).then(() =>{
        socket.emit("newUserConnection", username)
        user = username
    })
    


    document.getElementById("username-form").style.display = "none"
    document.getElementById("chat-form").style.display = "block"
})

document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const messageInput = document.getElementById("message")

    console.log("Soy mensaje", message)
    socket.emit("message", {username: user , message: messageInput.value})
    messageInput.value = ""
})

socket.on("allMessages", (data) => {
    let messageSpace = document.getElementById("show-messages")
    let messages = ""
    data.forEach((message)=> {
        messages = messages +  `${message.username}: ${message.message}</br>`
    })
    messageSpace.innerHTML = messages
})