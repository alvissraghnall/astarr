import { PartialType } from '@nestjs/mapped-types';
import { CreateStripeDto } from './create-payment.dto';

export class UpdateStripeDto extends PartialType(CreateStripeDto) {}
