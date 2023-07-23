import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength,  } from 'class-validator';
import { Role } from './user-role';
import { User } from './user.schema';

export class UserDTO extends User {

    id?: string;
    
    @IsNotEmpty()
    @MinLength(3, {message: "username must have at least 3 characters."})
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8, { message: "Password must have at least 8 characters." })
    password: string;

    role: Role;

    createdAt?: Date;

    updatedAt?: Date;
}

export class UserWithoutPassword extends User {

    @Exclude()
    password: string;

    constructor(partial?: Partial<UserWithoutPassword>) {
        super();
        Object.assign<UserWithoutPassword, Partial<User>>(this, partial);
    }
}