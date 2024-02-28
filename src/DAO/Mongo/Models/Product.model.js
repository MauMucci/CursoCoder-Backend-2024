import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true }, 
    price: { type: Number, required: true }, 
    status: { type: Boolean, default: true }, 
});


productSchema.plugin(mongoosePaginate)
const ProductModel = mongoose.model(productCollection,productSchema)

export default ProductModel