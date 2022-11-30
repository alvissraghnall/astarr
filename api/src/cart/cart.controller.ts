import { Body, Controller, HttpCode, UseGuards, HttpStatus, Post, Put, Req, BadRequestException, Param, Delete, Get, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CartDTO } from './cart.dto';
import { Role as UserRole } from 'src/user/user-role';
import { CartService } from './cart.service';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { ObjectId } from 'mongoose';


@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async createCart (@Req() req: Request, @Body() cartDTO: CartDTO) {
        return await this.cartService.create(cartDTO)
            .catch(err => {
                if (err.code == 11000) {
                    throw new BadRequestException(`User already has existing cart!`);
                }
            });;
    }

    @Get(":id")
    @UseGuards(VerifyUserIdGuard)
    @HttpCode(HttpStatus.OK)
    async getProducts (@Param("id") id: string | ObjectId) {
        const userCart = await this.cartService.get(id);
        if (!userCart.userId) throw new NotFoundException();
        return userCart;
    }

    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getCarts () {
        return await this.cartService.getAll();
    }


    @Put(':id')
    @UseGuards(VerifyUserIdGuard)
    async updateProduct (@Param("id") id: string, @Body() cartDTO: Partial<CartDTO> ) {
        if(cartDTO.userId !== id) throw new BadRequestException();
        return await this.cartService.update(id, cartDTO);
    }

    @Delete(":id")
    @UseGuards(VerifyUserIdGuard)
    async deleteProduct (@Param("id") id: string ): Promise<{ message: string; }> {
        await this.cartService.remove(id);
        return {
            message: "Cart successfully deleted!"
        }
    }


}
