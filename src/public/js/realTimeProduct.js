// src/public/js/realTimeProducts.js
const socket = io();

const realTimeProductsList = document.getElementById('realTimeProductsList');
const productForm = document.getElementById('productForm');

socket.emit('saludo',data => {
    console.log('hola desde cliente', data)
})


socket.on('realTimeProductUpdate', products => {
    
    realTimeProductsList.innerHTML = '';// Limpio la lista antes de actualizar

    // Agregar cada producto a la lista
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - ${product.description} - Precio: ${product.price}`;
        realTimeProductsList.appendChild(listItem);
    });
});

// Manejar el envío del formulario
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productName = document.getElementById('title').value;

    // Emitir un mensaje al servidor para crear un producto
    socket.emit('addProducts', { name: productName });
});

// Función para eliminar un producto (llamada desde el botón en el formulario)
function deleteProduct() {
    socket.emit('deleteProduct',{id:productId})
}
