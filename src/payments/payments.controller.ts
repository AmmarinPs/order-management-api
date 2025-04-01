import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Payment } from './entities/payment.entity';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'สร้างการชำระเงินใหม่' })
  @ApiResponse({ status: 201, description: 'การชำระเงินถูกสร้างสำเร็จ', type: Payment })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงข้อมูลการชำระเงินทั้งหมด' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ', type: [Payment] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลการชำระเงินตาม ID' })
  @ApiResponse({ status: 200, description: 'ดึงข้อมูลสำเร็จ', type: Payment })
  @ApiResponse({ status: 404, description: 'ไม่พบการชำระเงิน' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัพเดทการชำระเงิน' })
  @ApiResponse({ status: 200, description: 'อัพเดทสำเร็จ', type: Payment })
  @ApiResponse({ status: 404, description: 'ไม่พบการชำระเงิน' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบการชำระเงิน' })
  @ApiResponse({ status: 200, description: 'ลบสำเร็จ' })
  @ApiResponse({ status: 404, description: 'ไม่พบการชำระเงิน' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}