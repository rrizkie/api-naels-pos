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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const midtransClient = require('midtrans-client');

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(@Body() transaction: TransactionEntity) {
    const result = await this.transactionService.createTransaction(transaction);

    const snap = new midtransClient.Snap({
      isProduction: process.env.APP_ENV === 'prod',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: result.id,
        gross_amount: result.total_price,
      },
    };

    const { token } = await snap.createTransaction(parameter);

    return {
      message: 'Success',
      data: result,
      token,
    };
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
