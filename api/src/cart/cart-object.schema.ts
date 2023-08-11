import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ProductDTO } from "@product/product.dto";
import mongoose, { Document, ObjectId, PopulatedDoc } from "mongoose";
import { Product, } from "src/product/product.schema";


export type CartObjectDocument = CartObject & Document;

export class CartObject {

    product: Product | string | ObjectId;

    quantity: number;

}

export interface ICartObject extends mongoose.Document {
    product: mongoose.Types.ObjectId | string | ProductDTO;
    quantity: number;
}

export const CartObjectSchema = SchemaFactory.createForClass(CartObject);
