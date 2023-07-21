import { IsNotEmpty, IsAlpha, IsArray, IsNumber, IsBoolean } from "class-validator";
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
    category: string;

    sizes: ProductSize[];

    @IsArray()
    colors: string[];
    
    @IsNotEmpty()
    price: number;

    rating: number;

    discountPercentage?: number;

    discountIsActive?: boolean;

    inStock: boolean;
    
    createdAt: Date;
    
    updatedAt: Date;
}