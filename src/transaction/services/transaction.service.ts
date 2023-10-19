import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TransactionEntity,
  TransactionQuery,
  TransactionResponse,
  TransactionSummaryQuery,
  TransactionSummaryResponse,
} from '../models/transaction.entity';
import { Between, Repository } from 'typeorm';
import { BRANCH, TRANSACTION_STATUS } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { ExportService } from 'src/export/export.service';
import { currencyFormatter } from 'src/utils/currency';
import { format } from 'date-fns';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private jwtService: JwtService,
    private exportService: ExportService,
  ) {}

  async createTransaction(
    transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    const result = await this.transactionRepository.save(transaction);
    return result;
  }

  async findAllTransaction(
    query: TransactionQuery,
    token: string,
  ): Promise<TransactionResponse> {
    const userData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const { branch, artist, page = 1, size = 10, start_date, end_date } = query;

    const start = new Date(`${start_date} 00:00:001`);
    start.setHours(start.getHours() + 7);
    const end = new Date(`${end_date} 23:59:59`);
    end.setHours(end.getHours() + 7);

    const result = await this.transactionRepository.find({
      take: size,
      skip: (page - 1) * size,
      where: {
        isDeleted: false,
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        nail_artist: artist,
        ...(start_date &&
          end_date && {
            createdAt: Between(start, end),
          }),
      },
      order: { createdAt: 'DESC' },
    });

    const count = await this.transactionRepository.count({
      where: {
        isDeleted: false,
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        nail_artist: artist,
        ...(start_date &&
          end_date && {
            createdAt: Between(start, end),
          }),
      },
    });

    return {
      data: result,
      total: count,
    };
  }

  async exportTransactions(
    query: TransactionQuery,
    token: string,
  ): Promise<any> {
    const userData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const { branch, artist, start_date, end_date } = query;

    const start = new Date(`${start_date} 00:00:001`);
    start.setHours(start.getHours() + 7);
    const end = new Date(`${end_date} 23:59:59`);
    end.setHours(end.getHours() + 7);

    const result = await this.transactionRepository.find({
      where: {
        isDeleted: false,
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        nail_artist: artist,
        ...(start_date &&
          end_date && {
            createdAt: Between(start, end),
          }),
      },
      order: { createdAt: 'DESC' },
    });

    if (result.length === 0) {
      throw new BadRequestException();
    }

    const adjustedResult = result.map((res: TransactionEntity) => ({
      id: res.id,
      branch: res.branch_name.replace('_', ' '),
      nail_artist: res.nail_artist,
      total_price: currencyFormatter.format(res.total_price),
      transaction_date: format(res.createdAt, 'd MMM yyyy'),
    }));

    const file = this.exportService.exportFile(adjustedResult, 'Transactions');

    return file;
  }

  async findTransactionSummary(): Promise<TransactionSummaryResponse> {
    const all_branch = await this.transactionRepository.sum('total_price', {
      status: TRANSACTION_STATUS.PAID,
      isDeleted: false,
    });
    const tebet = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.TEBET,
      isDeleted: false,
      status: TRANSACTION_STATUS.PAID,
    });
    const santa = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.SANTA,
      isDeleted: false,
      status: TRANSACTION_STATUS.PAID,
    });
    const lubang_buaya = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.LUBANG_BUAYA,
      isDeleted: false,
      status: TRANSACTION_STATUS.PAID,
    });
    return {
      data: [
        {
          branch_name: BRANCH.TEBET,
          total_transaction: tebet,
        },
        {
          branch_name: BRANCH.SANTA,
          total_transaction: santa,
        },
        {
          branch_name: BRANCH.LUBANG_BUAYA,
          total_transaction: lubang_buaya,
        },
      ],
      total_transaction: all_branch,
    };
  }

  async findTransactionSummaryByBranch(
    { branch }: TransactionSummaryQuery,
    token: string,
  ): Promise<TransactionSummaryResponse> {
    const userData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const total_transaction = await this.transactionRepository.sum(
      'total_price',
      {
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        isDeleted: false,
        status: TRANSACTION_STATUS.PAID,
      },
    );
    return {
      data: [
        {
          branch_name:
            userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
          total_transaction,
        },
      ],
      total_transaction,
    };
  }
}
