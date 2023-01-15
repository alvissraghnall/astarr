import { IsNotEmpty, IsAlpha, IsArray } from "class-validator";
import { Expose } from "class-transformer";
import { ProductSize } from "./product-size";
import type { ObjectId } from "mongoose";

export class ProductDTO {

    id?: ObjectId | string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    image: string;

    @Expose()
    categories: string[];

    size: ProductSize[];

    @IsArray()
    color: string[];
    
    @IsNotEmpty()
    price: number;

    inStock: boolean;
    
    createdAt: Date;
    
    updatedAt: Date;
}