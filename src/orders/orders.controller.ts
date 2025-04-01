import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { Order } from '../Entity/orders.entity';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'สร้างคำสั่งซื้อใหม่' })
  @ApiResponse({ status: 201, description: 'คำสั่งซื้อถูกสร้างสำเร็จ', type: Order })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงข้อมูลคำสั่งซื้อทั้งหมด' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ', type: [Order] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลคำสั่งซื้อตาม ID' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ', type: Order })
  @ApiResponse({ status: 404, description: 'ไม่พบคำสั่งซื้อ' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}