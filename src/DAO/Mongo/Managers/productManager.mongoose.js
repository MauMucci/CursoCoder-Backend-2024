import ProductModel from "../Models/product.model.js"
import { CartManagerMongoose } from "./cartManager.mongoose.js";

const cartManagerMongoose = new CartManagerMongoose()

export class ProductManagerMongoose{

    getProductsAsync = async ({ limit = 6, page = 1, sort = '', query = '' } = {}) => {
        try {

            const parsedLimit = parseInt(limit);
            const skip = (page - 1) * parsedLimit;

            let queryParams = {}; //Almacena los paramtros de la consulta
    
            //Query almacena el tipo de documento que quiero buscar(es decir, el filtro) -> en este caso el titulo
            if (query) {
                queryParams = {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },   
                        {category: {$regex:query,$options:'i'}}                     
                    ]
                };
            }
            
            let aggregationPipeline = [];//Almacena los stages de agregacion 
    
            if (query) {
                aggregationPipeline.push({ $match: queryParams });
            }
    
            //Agrega etapa de ordenamiento 
            if (sort) {
                const sortOrder = sort === 'asc' ? 1 : -1;
                aggregationPipeline.push({ $sort: { price: sortOrder } });
            }
    
            //Agrega etapa de salto y limite de paginacion
            aggregationPipeline.push(
                { $skip: skip },
                { $limit: parsedLimit }
            );
    
            let filteredProducts = await ProductModel.aggregate(aggregationPipeline);
    
            const totalProducts = await ProductModel.countDocuments(queryParams);

        const totalPages = Math.ceil(totalProducts / parsedLimit); 
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const nextPage = hasNextPage ? (page + 1) : null;
        const prevPage = hasPrevPage ? (page - 1) : null;

        const prevLink = hasPrevPage ? `?limit=${parsedLimit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `?limit=${parsedLimit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        return {
            status: 'success',
            payload: filteredProducts,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
        
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
        }
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

    //DELETE
    deleteProductAsync = async (pid) => {       
        return await ProductModel.deleteOne({_id: pid})
    }
        
}


