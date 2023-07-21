import { Expose, Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/user/user.schema";
import { Cart } from "../cart/cart.schema";
import { Status } from "./order-status";
import { CartObject } from "src/cart/cart-object.schema";
import { CartObjectDTO } from "src/cart/cart-object.dto";

export class OrderDTO {

    @ValidateNested({ each: true })
    @Type(() => CartObjectDTO)
    products: CartObject[]

    @IsMongoId()
    userId: User | Types.ObjectId | string;

    @IsNumber()
    amount: number;
    
    @IsNotEmpty()
    address: string;

    status: Status;

    @Expose()
    createdAt: Date;

    updatedAt?: Date;
}