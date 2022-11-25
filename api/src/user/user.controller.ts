import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Role } from '../auth/decorator/role.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { Public } from '../auth/public.decorator';
import { Role as UserRole } from './user-role';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) {}

    // @UseGuards(AuthGuard())
    @Get('username')
    @Role(UserRole.ADMIN)
    getUserByUsername(@Req() req: Request, @Param('username') username: string) {
        console.log(req, "======\n\n", username);
        return this.service.getUserByUsername(username) || "Great!";
    }

}
