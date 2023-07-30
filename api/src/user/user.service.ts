import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Payload } from '@auth/auth.service';
import { HashService } from './password-hash.service';
import { UserDTO, UserWithoutPassword } from './user.dto';
import { User, UserDocument } from './user.schema';
import { MongooseError } from "mongoose";
import { Cart, CartDocument } from '@cart/cart.schema';
import { CartDTO } from '@cart/cart.dto';
import { CartService } from '@cart/cart.service';

@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User.name) private readonly model: Model<UserDocument>, 
        private hashService: HashService,
        private readonly cartService: CartService) {
    }

    async create (userDTO: UserDTO) {
        try {
        const newUser = new this.model({
            ...userDTO,
            createdAt: new Date(),
        });

        const existingUser = await this.getUserByEmail(newUser.email);
        if (existingUser) throw new HttpException({ message: "User already exists!"}, HttpStatus.BAD_REQUEST);

        newUser.password = await this.hashService.hashPassword(newUser.password);

        await newUser.save();
        
        const newUserCart = await this.cartService.create({
            userId: newUser._id ?? newUser.id,
            products: []
        });

        console.log(newUser.toObject(), newUserCart);;
        return newUser;
    } catch (err) {
        if(err.code == 11000 || err instanceof HttpException) {
            throw new BadRequestException({
                message: "User already exists!",
                statusCode: 400
            });
        } else {
            console.log(err);
            throw new InternalServerErrorException(err.message);
        }
    }
    }

    async getAll(limit?: number) {
        return !limit ? await this.model.find() : await this.model.find().sort({ _id: -1}).limit(limit);
    }


    async getUserByUsername(username: string) {
        return this.model.findOne({
            username
        })
        .exec();
    }

    async getUserByEmail(email: string) {
        return this.model.findOne({
            email
        })
        .exec();
    }

    async getUserById(id: ObjectId | string) {
        return this.model.findById(id)
            .exec();
    }

    async getByPayload ({ sub }: Payload): Promise<UserDTO> {
        return await this.model.findById(sub);
    }

    async getUserStats (lastYear: Date) {
        return await this.model.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
    }

    async updateUser (id: ObjectId, values: Partial<UserDTO>) {
        const updatedUser = await this.model.findByIdAndUpdate(id, {
           $set:  values
        });
        return updatedUser;
    }

    async deleteUser (id: ObjectId | string) {
        return await this.model.findByIdAndDelete(id);
    }

    mapUserToDTO (user: User, userDTO: UserDTO): UserDTO {
        userDTO.username = user.username;
        userDTO.email = user.email;
        userDTO.password = user.password;
        userDTO.createdAt = user.createdAt;
        userDTO.updatedAt = user.updatedAt;
        userDTO.role = user.role;

        return userDTO;
    }

    mapDTOToUser(userDTO: UserDTO, user: User) {
        user.username = userDTO.username;
        user.email = userDTO.email;
        user.password = userDTO.password;
        user.createdAt = userDTO.createdAt;
        user.updatedAt = userDTO.updatedAt;
        user.role = userDTO.role;

        return user;
    }

    mapUserToDTOWithoutPassword (user: User, userDTOWithoutPassword: UserWithoutPassword): UserWithoutPassword {
        userDTOWithoutPassword.username = user.username;
        userDTOWithoutPassword.email = user.email;
        userDTOWithoutPassword.password = user.password;
        userDTOWithoutPassword.createdAt = user.createdAt;
        userDTOWithoutPassword.updatedAt = user.updatedAt;

        return userDTOWithoutPassword;
    }
}
