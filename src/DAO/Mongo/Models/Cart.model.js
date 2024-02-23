import mongoose, { Schema, mongo } from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({      
    products:{
        type:[
            {
                product:{
                    type:Schema.Types.ObjectId, //
                    ref:'products',//hace ref a un documento de esta coleccion
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ],
        default:function(){
            return []
        }
    }

})

const CartModel = mongoose.model(cartCollection,cartSchema)

export default CartModel