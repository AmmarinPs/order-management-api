import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { CreateOrderDetailsDto } from './create-order-details.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID ของผู้ใช้ที่สร้างคำสั่งซื้อ',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'รายละเอียดคำสั่งซื้อ',
    type: [CreateOrderDetailsDto],
  })
  @IsArray()
  orderDetails: CreateOrderDetailsDto[];
}