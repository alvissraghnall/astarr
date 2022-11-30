import { InternalServerErrorException, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

@Controller('stripe')
export class StripeController {


  constructor(private readonly stripeService: StripeService) {}

  @Post("payment")
  async create(@Body() createStripeDto: CreatePaymentDto) {
    return this.stripeService.createPayment(createStripeDto)
      .catch(err => {
        throw new InternalServerErrorException("Hmm, Stripe!!");
      });
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
