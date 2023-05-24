import { CartObject } from "./cart-object.model";

export interface Cart {

    id: string;
    
    userId: string;

    products?: CartObject[];

    createdAt?: Date;

    updatedAt?: Date;
}