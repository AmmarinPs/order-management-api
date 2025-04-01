import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './orders.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID ของรายละเอียดคำสั่งซื้อ', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'ชื่อสินค้า', example: 'Laptop' })
  product: string;

  @Column()
  @ApiProperty({ description: 'จำนวนสินค้า', example: 2 })
  quantity: number;

  @Column()
  @ApiProperty({ description: 'ราคาต่อหน่วย', example: 500 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'คำสั่งซื้อที่เกี่ยวข้อง', type: () => Order })
  order: Order;
}