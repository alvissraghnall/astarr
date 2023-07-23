import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserDocument } from "@user/user.schema";
import { ProductService } from "@product/product.service";
import { Request } from "express";

@Injectable()
export class ProductExists implements CanActivate {

    constructor (private readonly productService: ProductService) {}

    async canActivate(context: ExecutionContext) {
    
        const body = context.switchToHttp().getRequest<Request>().body;

        const product = this.productService.getProduct(body.productId);
            // .then(
            //     product => {
            //         if(product) re
            //     }
            // )

        if (product) {
            return true;
        }
        return false;
    }
    
}