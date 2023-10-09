import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
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
  findAll(
    @Query() query: TransactionQuery,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.split(' ')[1];
    return this.transactionService.findAllTransaction(query, token);
  }

  @Get('summary')
  findAllStats(
    @Query('branch') branch: BRANCH,
    @Headers('authorization') authorization: string,
  ) {
    if (branch) {
      const token = authorization.split(' ')[1];
      return this.transactionService.findTransactionSummaryByBranch(
        { branch },
        token,
      );
    }
    return this.transactionService.findTransactionSummary();
  }
}
