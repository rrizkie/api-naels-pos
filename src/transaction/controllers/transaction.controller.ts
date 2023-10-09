import { Body, Controller, Get, Post } from '@nestjs/common';
import { Transaction } from '../models/transaction.interface';
import { TransactionService } from '../services/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: Transaction) {
    return this.transactionService.createTransaction(transaction);
  }

  @Get()
  findAll() {
    return this.transactionService.findAllTransaction();
  }
}
