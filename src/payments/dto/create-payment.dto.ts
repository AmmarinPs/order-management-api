import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID ของคำสั่งซื้อที่ต้องการชำระGGGG',
    example: 1,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'จำนวนเงินที่ชำระGGGG',
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'วิธีการชำระเงินGGGG',
    example: 'credit_card',
  })
  @IsString()
  method: string;
}