import { IsMongoId, IsNumber } from "class-validator";
import { ProductDTO } from "src/product/product.dto";

export class CartObjectDTO {

    @IsMongoId()
    productId: ProductDTO;

    @IsNumber()
    quantity: number;
}