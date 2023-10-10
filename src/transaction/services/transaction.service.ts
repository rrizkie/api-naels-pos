import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTransactionResponse,
  TransactionEntity,
  TransactionQuery,
  TransactionResponse,
  TransactionSummaryQuery,
  TransactionSummaryResponse,
} from '../models/transaction.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BRANCH } from 'src/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private jwtService: JwtService,
  ) {}

  async createTransaction(
    transaction: TransactionEntity,
  ): Promise<CreateTransactionResponse> {
    const result = await this.transactionRepository.save(transaction);
    return {
      message: 'Success',
      data: result,
    };
  }

  async findAllTransaction(
    query: TransactionQuery,
    token: string,
  ): Promise<TransactionResponse> {
    const userData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const { branch, artist, page = 1, size = 10, start_date, end_date } = query;

    const result = await this.transactionRepository.find({
      take: size,
      skip: (page - 1) * size,
      where: {
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        nail_artist: artist,
        ...(start_date &&
          end_date && {
            createdAt:
              MoreThanOrEqual(new Date(`${start_date} 00:00:00`)) &&
              LessThanOrEqual(new Date(`${end_date} 23:59:59`)),
          }),
      },
      order: { createdAt: 'DESC' },
    });

    const count = await this.transactionRepository.count({
      where: {
        branch_name:
          userData.branch !== BRANCH.ALL_BRANCH ? userData.branch : branch,
        nail_artist: artist,
      },
    });

    return {
      data: result,
      total: count,
    };
  }

  async findTransactionSummary(): Promise<TransactionSummaryResponse> {
    const all_branch = await this.transactionRepository.sum('total_price');
    const tebet = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.TEBET,
    });
    const santa = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.SANTA,
    });
    const lubang_buaya = await this.transactionRepository.sum('total_price', {
      branch_name: BRANCH.LUBANG_BUAYA,
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
