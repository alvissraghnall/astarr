import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from "stripe";

@Injectable()
export class StripeService {

  private stripe: Stripe;

  constructor () {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: "2022-11-15"
    });
  }

  async createPayment (createPaymentDto: CreatePaymentDto): Promise<Stripe.Response<Stripe.Charge>> {
    return await this.stripe.charges.create({
      source: createPaymentDto.tokenId,
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency ?? "nzd"
    });
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
