import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderDetails } from './order-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}