const socket = io(); // instancia al socket y lo guarda en la variable

const addProductForm = document.getElementById('addProductForm');

// Manejo el envío del formulario 
addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    //Obtengo los datos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    //Armo el producto para luego enviarlo
    const product={
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    // Emito un mensaje al servidor con el nuevo producto
    socket.emit('addProduct',product);
    console.log(`Producto agregado ${product.title} RTP`) //esto lo muestra en el sit

    // Limpiar los campos del formulario
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('code').value = '';
    document.getElementById('stock').value = '';

    
});


const deleteProductForm = document.getElementById('deleteProductForm');

deleteProductForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe normalmente
    const productId = document.getElementById('productId').value; // Obtiene el ID del producto a eliminar del campo de entrada
    socket.emit('deleteProduct', productId); // Envía el ID del producto al servidor para eliminarlo
});




