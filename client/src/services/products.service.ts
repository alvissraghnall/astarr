import axios from "axios"
import { apiUrl } from "."

export const getProducts = async (cat?: string) => {
    try {
        const products = axios.get(cat 
            ? `${apiUrl}/product?categories=${cat}`
            : `${apiUrl}/product`);
        console.log(products);;

        return await products;
        
    } catch (error) {
        console.error(error);
    }
}