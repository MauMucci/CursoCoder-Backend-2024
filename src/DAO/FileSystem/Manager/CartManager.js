import fs from 'fs'
import { ProductManager } from './ProductManager.js';

let pm = new ProductManager("./files/products.json")


export class CartManager{

    constructor(file){
        this.carts = [];
        this.filePath = file;
    }

    async loadCartsFromFile() {
        try{
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');

            if (!fileContent.trim()) { //verifica que este vacio
                console.log("El archivo está vacío o no contiene datos JSON. Creando un nuevo arreglo vacío.");
                return [];
            }
            this.carts = JSON.parse(fileContent);
            //console.log("Carritos de compras CARGADO correctamente desde loadCartsFromFile");
            return this.carts;
        }

        catch (error) {
            console.error("Error cargando carritos de compras desde el archivo desde loadCartsFromFile", error);
            this.code = [];
            return null

        }
    }

    async saveCartOnFile(){
        try{
            await fs.promises.writeFile(this.filePath,JSON.stringify(this.carts,null,2))
            //console.log(("carrito de compras GUARDADO correctamente"))
        }
        catch(error){
            console.error('Error escribiendo en el archivo:', error);
        }
    }

    async getCartsAsync() {
        await this.loadCartsFromFile();
        console.log("++++ Carrito de compras ++++")
        console.log(this.carts) 
        return this.carts  
    }

    async addCartAsync() {
        this.carts = await this.loadCartsFromFile()
        const cart = {
            id: null,
            products: []
        };

        if(this.carts.length === 0){//Si no hay carritos en el arreglo => le asignamos el id 1
            cart.id = 1;    
            console.log("primer carrito agregado")
        }
        else{       
            const lastCart = this.carts [this.carts.length-1] 
            cart.id = lastCart.id + 1; 
        }
        this.carts.push(cart)
        await this.saveCartOnFile();

    }

    async getCartByIdAsync(cid) {
        this.carts = await this.loadCartsFromFile();
        const cart = this.carts.find(cart => cart.id === cid);
        //console.log(`Carrito de compras encontrado con el id ${cart.id} desde getCartByIdAsync `)
        return cart
      }

    async addProductToCartAsync(cid, pid) {
        try {
            //await this.loadCartsFromFile();
            cid = parseInt(cid)
            pid = parseInt(pid)

            const cartSelected = await this.getCartByIdAsync(cid) 
    
            if (!cartSelected) {
                console.log(`Carrito con ID ${cid} no encontrado desde addProductToCartAsync.`);
                return null;
            }
        
            const productSelected = await pm.getProductsByIdAsync(pid);

            if (!productSelected) {
                console.log(` Producto con ID ${pid} no encontrado desde addProductToCartAsync.`);
                return null;
            }

            const existingProduct = cartSelected.products.find(p => p.product === pid)

            if (existingProduct) {
                existingProduct.quantity = existingProduct.quantity + 1;
            }
            else {
                cartSelected.products.push({ product: pid, quantity: 1 });
            }

            await this.saveCartOnFile();
            console.log("OK1")
            return cartSelected;
        }
            catch (error) {
                console.error("Error en addProductToCartAsync:", error);
                throw error;
            }
        

}

}


//let cm = new CartManager("./files/carts.json")

//cm.loadCartsFromFile();
//cm.getCartsAsync();
//cm.addCartAsync()

//cm.addProductToCartAsync(2,1)


//