import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Role } from '../auth/decorator/role.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { Public } from '../auth/decorator/public.decorator';
import { Role as UserRole } from './user-role';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { User, UserDocument } from './user.schema';
import { HashService } from './password-hash.service';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService, private readonly hashService: HashService) {}

    // @UseGuards(AuthGuard())
    @Get('username')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    async getUserByUsername(@Query('username') username: string, @Req() req: Request) {
        console.log(req.user, "======\n\n", username);
        const user = await this.service.getUserByUsername(username);

        const { password, ...others } = user.toJSON();
        return others;
    }

    @Put('/:id')
    async updateUser (@Param("id") id: string, @Req() req: Request, @Body() userDTO: Partial<UserDTO> ) {
        console.log(req.user, id);
        if (((req.user as UserDocument)._id as ObjectId).toString() === id || (req.user as UserDocument).role === UserRole.ADMIN) {
            if (userDTO.password) {
                userDTO.password = await this.hashService.hashPassword(userDTO.password);
            }
            try {
                const updatedUser = await this.service.updateUser((req.user as UserDocument)._id, userDTO);
                return updatedUser;
            } catch (err) {
                throw new InternalServerErrorException();
                
            }
        } else throw new UnauthorizedException("Hmmmm!");
    }

}
