import axios from "axios"
import { apiUrl, PUBLIC_REQ } from "."

export const getProducts = async (cat?: string) => {
    try {
        const products = axios.get(cat 
            ? `${apiUrl}/product?categories=${cat}`
            : `${apiUrl}/product`);
        console.log(products);;

        return (await products).data;
        
    } catch (error) {
        console.error(error);
    }
}

export const getProduct = async (id: string) => {
    const res = PUBLIC_REQ.get(`/product/${id}`);
    return (await res).data;
}