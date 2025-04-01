import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID ของคำสั่งซื้อ', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'ID ของผู้ใช้', example: 1 })
  userId: number;

  @Column()
  @ApiProperty({ description: 'ยอดรวมทั้งหมด', example: 1000 })
  totalAmount: number;

  @Column({ default: 'pending' })
  @ApiProperty({ description: 'สถานะของคำสั่งซื้อ', example: 'pending' })
  status: string;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, { cascade: true })
  @ApiProperty({ description: 'รายละเอียดคำสั่งซื้อ', type: () => [OrderDetails] })
  orderDetails: OrderDetails[];
}