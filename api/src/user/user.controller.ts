import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Role } from '../auth/decorator/role.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { Public } from '../auth/decorator/public.decorator';
import { Role as UserRole } from './user-role';
import { UserDTO, UserWithoutPassword } from './user.dto';
import { UserService } from './user.service';
import { User, UserDocument } from './user.schema';
import { HashService } from './password-hash.service';
import { ObjectId } from 'mongoose';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UserInterceptor } from './interceptor/user.interceptor';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService, private readonly hashService: HashService) {}

    // @UseGuards(AuthGuard())
    @Get('username')
    @UseGuards(RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Role(UserRole.ADMIN)
    @ApiOkResponse({
        description: "get user by username",
    })
    async getUserByUsername(@Query('username') username: string, @Req() req: Request) {
        console.log(req.user, "======\n\n", username);
        const user = await this.service.getUserByUsername(username);

        // const { password, ...others } = user.toJSON();
        return user;
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(UserInterceptor)
    @Put('/:id')
    @UseGuards(VerifyUserIdGuard)
    async updateUser (@Param("id") id: string, @CurrentUser() user: UserDocument, @Body() userDTO: Partial<UserDTO> ) {
        console.log(user, id);

        // if (userDTO.role) throw new BadRequestException("Cannot edit user role!");
        
        if (userDTO.password) {
            userDTO.password = await this.hashService.hashPassword(userDTO.password);
        }
        try {
            const updatedUser = await this.service.updateUser(user._id, userDTO);
            // const userDTOWithoutPassword = this.service.mapUserToDTOWithoutPassword(updatedUser, new UserWithoutPassword());
            return updatedUser;
        } catch (err) {
            throw new BadRequestException();
        }
    }

    @Delete("/:id")
    @UseGuards(VerifyUserIdGuard)
    async deleteUser (@Param("id") id: string ): Promise<{ message: string; }> {
        try {
            await this.service.deleteUser(id);
            return {
                message: "User successfully deleted!"
            }
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @UseInterceptors(UserInterceptor)
    @Get('/:id')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    async getUserById (@Param('id') id: string) {
        const user = await this.service.getUserById(id);

        // const userDTOWithoutPassword = this.service.mapUserToDTOWithoutPassword(user, new UserWithoutPassword());
        return user;
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(UserInterceptor)
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }))
    @Get('/')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getAllUsers (@Query("size") size: number) {
        const users = await this.service.getAll(size);
        return users;
    }

}
