//import  ChatManagerMongoose  from "../../DAO/Mongo/Managers/chatManager.mongoose.js";
import { chatModel } from "../../DAO/Mongo/Models/Chat.model.js";
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const messageLogs = document.getElementById('messageLogs');
let userName = localStorage.getItem('userName');

//const chatManagerMongoose = new ChatManagerMongoose()

// Llama a getUserName solo si no hay un nombre de usuario almacenado
if (!userName) {
    getUserName().then((name) => {
        if (name) {
            userName = name;
            localStorage.setItem('userName', userName); // Guarda el nombre de usuario en el almacenamiento local para que persista
            console.log("Nombre de usuario:", userName);
        } else {
            console.log("No se ingresó nombre de usuario");
        }
    });
} else {
    console.log("Nombre de usuario existente:", userName);
}


chatForm.addEventListener('submit', event => {
    event.preventDefault();

    if (userName) {
        const message = messageInput.value.trim();

        if (message !== '') {
            console.log("Mensaje enviado:", message);
            messageInput.value = "";
            displayMessage(userName, message);
            saveMessage(userName,message)
            
        } else {
            console.log("Mensaje vacío");
        }
    } else {
        console.log("No hay un nombre de usuario establecido");
    }
});

const displayMessage = (userName, message) => {
    const userNameContainer = document.createElement('h1');
    userNameContainer.textContent = userName;

    const messageContainer = document.createElement('p');
    messageContainer.textContent = message;
    messageLogs.appendChild(userNameContainer);
    messageLogs.appendChild(messageContainer);
    

};

const getUserName = async () =>{
    const { value: name } = await Swal.fire({
        title: "Ingresa tu nombre de usuario",
        input: "text",
        inputLabel: "Nombre de usuario",
        inputPlaceholder: "Ingresa tu nombre aquí",
        confirmButtonText: "Enviar",
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return "Debes ingresar un nombre de usuario";
            }
        }
    });
    return name;
}

const saveMessage = async (email,message) =>{
    try {
        const newMessage = chatModel({
            email: email,
            message: message,
            postTime: new Date()
        })
        await newMessage.save()
        console.log("Mensaje guardado en la bdd", newMessage)
        return newMessage

        }
    catch (error) {
        console.log("error al guardar el mensaje",error)
        
    }
}




