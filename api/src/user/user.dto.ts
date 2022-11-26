import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty,  } from 'class-validator';
import { Role } from './user-role';
import { User } from './user.schema';

export class UserDTO extends User {
    
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
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