import { toast } from "react-toastify";
import { AUTH_REQ } from "."
import { Cart } from "../models/cart.model";

export const fetchCart = async () => {
    try {
        const response = await AUTH_REQ().get(`/cart/user`, {
            method: "GET"
        });
        return response.data;
    } catch (err) {
        const error = err as Error;
        console.error(error);
        toast.error(error.message);
    }
}

export const createCart = async (cartData: Cart) => {
    try {
        const res = await AUTH_REQ().post("/cart", cartData);
        return res.data;
    } catch (err: unknown) {
        const error = err as Error;
        console.error(error);
        toast.error(error.message);
    }
}


export const updateCart = async (cartData: Cart) => {
    try {
        const res = await AUTH_REQ().post(`/cart/${cartData.id}`, cartData);
        return res.data;
    } catch (err: unknown) {
        const error = err as Error;
        console.error(error);
        toast.error(error.message);
    }
}