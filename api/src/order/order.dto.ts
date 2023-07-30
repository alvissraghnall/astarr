import { Expose, Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { User } from "src/user/user.schema";
import { Cart } from "../cart/cart.schema";
import { Status } from "./order-status";
import { CartObject } from "src/cart/cart-object.schema";
import { CartObjectDTO } from "src/cart/cart-object.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO {

    @ValidateNested({ each: true })
    @Type(() => CartObjectDTO)
    @ApiProperty()
    products: CartObject[]

    @IsMongoId()
    @ApiProperty()
    userId: User | Types.ObjectId | string;

    @IsNumber()
    @ApiProperty()
    amount: number;
    
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @ApiProperty()
    status: Status;

    @Expose()
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt?: Date;
}