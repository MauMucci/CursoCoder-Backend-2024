// home.js

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Instancia del socket

    socket.on('updateProducts', async (products) => {
        // Limpiar la tabla de productos existente
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        // Recorrer la lista de productos y agregar cada uno a la tabla
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
            `;
            productList.appendChild(row);
        });
    });
});
