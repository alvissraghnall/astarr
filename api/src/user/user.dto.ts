import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEmpty, IsNotEmpty, MinLength,  } from 'class-validator';
import { Role } from './user-role';
import { User } from './user.schema';
// import { DecorateAll } from '@/common/decorator/decorate-all.decorator';
import { Document, Types } from 'mongoose';
import { Product } from '@product/product.schema';

// @DecorateAll(Expose)
export class UserDTO {

    @Expose()
    id?: string;
    
    @IsNotEmpty()
    @Expose()
    @MinLength(3, {message: "username must have at least 3 characters."})
    username: string;

    @Expose()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8, { message: "Password must have at least 8 characters." })
    password: string;

    @IsEmpty()
    role: Role;

    @IsEmpty()
    favourites: (Product | Types.ObjectId | string)[];

    @Expose()
    createdAt?: Date;

    @Expose()
    updatedAt?: Date;

    constructor(
        id?: string,
        username?: string, email?: string,
        password?: string, role?: Role,
        createdAt?: Date, updatedAt?: Date
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

// @DecorateAll(Expose)
export class UserWithoutPassword extends UserDTO {

    @Exclude()
    password: string;

    constructor(partial?: Partial<UserWithoutPassword>) {
        super();
        Object.assign<UserWithoutPassword, Partial<User>>(this, partial);
    }
}