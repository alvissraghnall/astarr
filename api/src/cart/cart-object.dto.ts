import { IsMongoId, IsNumber } from "class-validator";
import { ProductDTO } from "src/product/product.dto";
import { Product } from "src/product/product.schema";

export class CartObjectDTO {

    @IsMongoId()
    productId: string;

    @IsNumber()
    quantity: number;

    // @IsNumber()
    // totalPrice: number;

    product?: Product;

}