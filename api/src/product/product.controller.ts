import { Controller, Post, NotFoundException, Put, Delete, Get, Body, Query, UseGuards, HttpCode, HttpStatus, Param, BadRequestException, Patch  } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { Role } from '../auth/decorator/role.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role as UserRole } from "../user/user-role";
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { ApiNoContentResponse } from '@nestjs/swagger';


@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}


    @Post("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async createProduct (@Body() productDTO: ProductDTO) {
        return await this.productService.createProduct(productDTO)
            .catch(err => {
                if (err.code == 11000) {
                    throw new BadRequestException(`Product with title: ${productDTO.title} already exists!`);
                }
            });
    }

    @Get(":id")
    @Public()
    @HttpCode(HttpStatus.OK)
    async getProduct (@Param("id") id: string) {
        const prod = await this.productService.getProduct(id);
        if (!prod.createdAt) throw new NotFoundException();

        return prod;
    }


    @Get("")
    @Public()
    @HttpCode(HttpStatus.OK)
    async getProducts (@Query("new") isNew?: boolean, @Query("category") category?: string) {
        return await this.productService.getProducts({
            new: isNew, cat: category
        });
    }

    @Put('/:id')
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    async replaceProduct (@Param("id") id: string, @Body() productDTO: ProductDTO) {
        return await this.productService.replaceProduct(id, productDTO);
    }

    @Patch("/:id")
    @ApiNoContentResponse()
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    async updateProduct (
        @Param("id") id: string,
        @Body() productDTO: Partial<ProductDTO>
    ) {
        return await this.productService.updateProduct(id, productDTO);
    }

    @Delete("/:id")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    async deleteProduct (@Param("id") id: string ): Promise<{ message: string; }> {
        await this.productService.deleteProduct(id);
        return {
            message: "Product successfully deleted!"
        }
    }

}
