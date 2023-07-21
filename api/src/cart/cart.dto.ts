import { Exclude, Expose, Type,  } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, ValidateNested, IsEmpty } from "class-validator";
import { ObjectId } from "mongoose";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.schema";
import { CartObjectDTO } from "./cart-object.dto";
import { CartObject } from "./cart-object.schema";


export class CartDTO {

    id?: string | ObjectId;

    // @ValidateNested()
    // @Type(() => UserDTO)
    @IsMongoId()
    @IsEmpty()
    userId: User | string | ObjectId;

    @ValidateNested({ each: true })
    @Type(() => CartObjectDTO)
    products?: CartObjectDTO[];

    @Expose()
    createdAt?: Date;

    updatedAt?: Date;
}