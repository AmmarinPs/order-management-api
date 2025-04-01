import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({
    description: 'สถานะการชำระเงิน (ถ้าต้องการอัพเดท)',
    example: 'completed',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}