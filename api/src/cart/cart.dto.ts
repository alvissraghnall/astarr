import { Exclude, Expose, Transform, Type,  } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, ValidateNested, IsEmpty } from "class-validator";
import { ObjectId } from "mongoose";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.schema";
import { CartObjectDTO } from "./cart-object.dto";
import { CartObject } from "./cart-object.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CartDTO {

    @ApiProperty({
        type: String
    })
    @Expose()
    id?: string | ObjectId;

    // @ValidateNested()
    @Transform(({ value }) => value?.toString())
    @Expose()
    @IsEmpty()
    @ApiProperty({
        type: String
    })
    userId?: string;

    @ValidateNested({ each: true })
    @Expose()
    @ApiProperty({ description: 'Items in the cart', type: [CartObjectDTO] })
    @Type(() => CartObjectDTO)
    products?: CartObjectDTO[];

    @ApiProperty({
        type: Date
    })
    @Expose()
    createdAt?: Date;

    @ApiProperty({
        type: Date
    })
    @Expose()
    updatedAt?: Date;
}