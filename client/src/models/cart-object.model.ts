import { Product } from "./product.model";

export interface CartObject {

    productId: number;

    quantity: number;

    totalPrice: number;
}