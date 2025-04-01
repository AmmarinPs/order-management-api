import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { OrderDetails } from './entities/order-details.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, orderDetails } = createOrderDto;

    const totalAmount = orderDetails.reduce(
      (sum, detail) => sum + detail.quantity * detail.price,
      0,
    );

    const order = this.ordersRepository.create({
      userId,
      totalAmount,
      status: 'pending',
      orderDetails: orderDetails.map((detail) =>
        this.orderDetailsRepository.create(detail),
      ),
    });
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['orderDetails'] });
  }

  async findOne(id: number): Promise<Order|null> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails'],
    });
  }
}