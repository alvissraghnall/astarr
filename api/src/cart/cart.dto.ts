import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.schema";
import { CartObject } from "./cart-object.schema";


export class CartDTO {

    @ValidateNested()
    @Type(() => UserDTO)
    userId: User;
    

    @ValidateNested({ each: true })
    @Type(() => CartObject)
    products: CartObject[];

    createdAt: Date;

    updatedAt?: Date;
}