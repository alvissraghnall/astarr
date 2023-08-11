import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { HashService } from '@user/password-hash.service';
import { UserDTO, UserWithoutPassword } from '@user/user.dto';
import { User, UserDocument } from '@user/user.schema';
import { UserService } from '@user/user.service';
import { Document, Types } from 'mongoose';
import { UserLoginPayload } from './payload/login.payload';

export type UserEntity = User & Document<any, any, any> & {
    _id: Types.ObjectId;
}

export type Payload = {
  username: string,
  email?: string,
  sub: string
};

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise < any > {
        const user = await this.userService.getUserByUsername(username);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
          const { password, ..._rest } = user;
          return _rest;
        }
        return null;
    }

    async validateUserPayload (payload: Payload) {
      const user = await this.userService.getByPayload(payload);
      if (!user) throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);

      return user;
    }

    async login(user: UserLoginPayload, signOptions: JwtSignOptions = {}) {
      const userInDb = await this.userService.getUserByUsername(user.username);

      if (!userInDb || !await this.validateUser(user.username, user.password)) throw new HttpException("Username or password provided incorrect.", HttpStatus.BAD_REQUEST);

      console.log(userInDb);
      const payload = {
        username: userInDb.username,
        sub: userInDb.id
      };
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload, signOptions),
      };
    }

    async register (user: UserDTO) {
      const newUser = await this.userService.create(user);
      // const userTransport = this.userService.mapUserToDTOWithoutPassword(newUser, new UserWithoutPassword());
      // const { password, ...others } = newUser.toJSON();
      return newUser;
    }
}
