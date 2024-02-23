import ProductModel from "../Models/product.model.js"

export class ProductManagerMongoose{

    getProductsAsync = async () => {
        return await ProductModel.find()
    }

    getProductByIdAsync = async (pid) => {
        return await ProductModel.findById(pid)
    }

    addProductAsync = async({title,description,thumbnail,code,stock,price,status}) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("datos incompletos para agregar el producto")
            return null
        }
        return await ProductModel.create({title,description,thumbnail,code,stock,price,status})
    }

    updateProductAsync = async (pid,productToReplace) => {
        if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock) {
            console.log("datos incompletos para sobreescribir el producto")
            return null
        }
        return await ProductModel.updateOne({_id: pid},productToReplace)

    }

    deleteProductAsync = async (pid) => {       
        return await ProductModel.deleteOne({_id: pid})
    }
}


