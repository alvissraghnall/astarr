import { Body, Controller, HttpCode, UseGuards, HttpStatus, Post, Put, Req, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CartDTO } from './cart.dto';
import { Role as UserRole } from 'src/user/user-role';
import { CartService } from './cart.service';


@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Post("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async createCart (@Req() req: Request, @Body() cartDTO: CartDTO) {
        return await this.cartService.create(cartDTO)
            .catch(err => {
                if (err.code == 11000) {
                    throw new BadRequestException(`User already has existing cart!`);
                }
            });;
    }

}
