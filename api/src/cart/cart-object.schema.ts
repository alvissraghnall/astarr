import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Product } from "src/product/product.schema";


export type CartObjectDocument = CartObject & Document;

export class CartObject {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })    
    productId: Product;

    @Prop({ default: 1 })
    quantity: number;
}


export const CartObjectSchema = SchemaFactory.createForClass(CartObject);