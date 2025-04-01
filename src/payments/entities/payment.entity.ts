import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/orders.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID ของการชำระเงินTEST', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'ID ของคำสั่งซื้อที่เกี่ยวข้องTEST', example: 1 })
  orderId: number;

  @Column()
  @ApiProperty({ description: 'จำนวนเงินที่ชำระTEST', example: 1000 })
  amount: number;

  @Column()
  @ApiProperty({ description: 'วิธีการชำระเงิน', example: 'credit_card' })
  method: string;

  @Column({ default: 'pending' })
  @ApiProperty({ description: 'สถานะการชำระเงิน', example: 'pending' })
  status: string;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'คำสั่งซื้อที่เกี่ยวข้อง', type: () => Order })
  order: Order;
}