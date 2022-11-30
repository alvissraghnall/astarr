import { Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/user/user.schema";
import { Cart } from "../cart/cart.schema";
import { Status } from "./order-status";

export class OrderDTO {

    @IsMongoId()
    cartId: Cart | string | Types.ObjectId;

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