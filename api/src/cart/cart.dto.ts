import { Expose, Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { ObjectId } from "mongoose";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.schema";
import { CartObjectDTO } from "./cart-object.dto";
import { CartObject } from "./cart-object.schema";


export class CartDTO {

    // @ValidateNested()
    // @Type(() => UserDTO)
    @IsMongoId()
    userId: User | string | ObjectId;

    @ValidateNested({ each: true })
    @Type(() => CartObjectDTO)
    products?: CartObjectDTO[];

    @Expose()
    createdAt: Date;

    updatedAt?: Date;
}