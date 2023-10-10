import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  TransactionQuery,
  TransactionEntity,
} from '../models/transaction.entity';
import { BRANCH } from 'src/constants';
import { Response } from 'express';

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

  @Get('export')
  async export(
    @Query() query: TransactionQuery,
    @Headers('authorization') authorization: string,
    @Res() res: Response,
  ) {
    const token = authorization.split(' ')[1];
    const result = await this.transactionService.exportTransactions(
      query,
      token,
    );
    res.download(`${result}`);

    return;
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
