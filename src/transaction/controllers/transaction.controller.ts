import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  TransactionQuery,
  TransactionEntity,
} from '../models/transaction.entity';
import { BRANCH } from 'src/constants';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionEntity) {
    return this.transactionService.createTransaction(transaction);
  }

  @Get()
  findAll(@Query() query: TransactionQuery) {
    return this.transactionService.findAllTransaction(query);
  }

  @Get('summary')
  findAllStats(@Query('branch') branch: BRANCH) {
    if (branch) {
      return this.transactionService.findTransactionSummaryByBranch({ branch });
    }
    return this.transactionService.findTransactionSummary();
  }
}
