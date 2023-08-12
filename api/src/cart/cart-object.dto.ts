import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId, IsNumber } from "class-validator";
import { ObjectId, Schema, Types } from "mongoose";
import { ProductDTO } from "src/product/product.dto";
// import { Product } from "src/product/product.schema";

export class CartObjectRequestDTO {

    @ApiProperty({ description: 'ID of the product' })
    @IsMongoId()
    productId: string;

    @ApiProperty({ description: 'Quantity of the product in the cart', minimum: 1 })
    quantity?: number;

}

export class CartObjectDTO {
    
    @Expose()
    product: ProductDTO;

    @Expose()
    quantity: number;

}