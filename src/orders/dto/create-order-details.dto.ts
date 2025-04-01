import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDetailsDto {
  @ApiProperty({
    description: 'ชื่อสินค้า',
    example: 'Laptop',
  })
  @IsString()
  product: string;

  @ApiProperty({
    description: 'จำนวนสินค้า',
    example: 2,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'ราคาต่อหน่วย',
    example: 500,
  })
  @IsNumber()
  @Min(0)
  price: number;
}