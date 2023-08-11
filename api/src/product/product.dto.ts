import { IsNotEmpty, IsAlpha, IsArray, IsNumber, IsBoolean, IsEmpty } from "class-validator";
import { Expose } from "class-transformer";
import { ProductSize } from "./product-size";
import type { ObjectId } from "mongoose";
// import { DecorateAll } from "@/common/decorator/decorate-all.decorator";

// @DecorateAll(Expose)
export class ProductDTO {

    @Expose()
    id?: ObjectId | string;

    @IsNotEmpty()
    @Expose()
    title: string;

    @IsNotEmpty()
    @Expose()
    desc: string;

    @IsNotEmpty()
    @Expose()
    image: string;

    @Expose()
    category: string;

    @Expose()
    sizes: ProductSize[];

    @IsArray()
    @Expose()
    colors: string[];
    
    @IsNotEmpty()
    @Expose()
    price: number;

    @Expose()
    rating: number;

    @Expose()
    discountPercentage?: number;

    @IsEmpty()
    @Expose()
    discountIsActive: boolean;

    @Expose()
    inStock: boolean;
    
    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;
}