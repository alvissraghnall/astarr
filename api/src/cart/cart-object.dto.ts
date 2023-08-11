import { IsMongoId, IsNumber } from "class-validator";
import { ObjectId, Schema, Types } from "mongoose";
import { ProductDTO } from "src/product/product.dto";
import { Product } from "src/product/product.schema";

export class CartObjectRequestDTO {

    @IsMongoId()
    productId: string;

    quantity?: number;

}

export class CartObjectDTO {
    
    product: Product | string | ObjectId;

    quantity: number;

}