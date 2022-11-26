import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Payload } from 'src/auth/auth.service';
import { HashService } from './password-hash.service';
import { UserDTO } from './user.dto';
import { User, UserDocument } from './user.schema';
import { MongooseError } from "mongoose";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>, private hashService: HashService) {

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

        return await newUser.save();
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

    async getByPayload ({ sub }: Payload): Promise<UserDTO> {
        return await this.model.findById(sub);
    }

    async updateUser (id: ObjectId, values: Partial<UserDTO>) {
        const updatedUser = await this.model.findByIdAndUpdate(id, {
           $set:  values
        });
        return updatedUser;
    }
}
