import { IsNotEmpty, IsAlpha } from "class-validator";


export class ProductDTO {

    @IsNotEmpty()
    @IsAlpha()
    title: string;

    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    image: string;

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