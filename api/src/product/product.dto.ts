import { IsNotEmpty, IsAlpha } from "class-validator";
import { Expose } from "class-transformer";

export class ProductDTO {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    image: string;

    @Expose()
    categories: string[];

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    color: string;
    
    @IsNotEmpty()
    price: number;
    
    createdAt: Date;
    
    updatedAt: Date;
}