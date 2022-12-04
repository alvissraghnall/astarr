import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdateStripeDto extends PartialType(CreatePaymentDto) {}
