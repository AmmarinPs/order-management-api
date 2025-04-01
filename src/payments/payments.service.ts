import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      status: 'pending', // ตั้งค่าเริ่มต้น
    });
    return this.paymentsRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id); 
    Object.assign(payment, updatePaymentDto);
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }
}