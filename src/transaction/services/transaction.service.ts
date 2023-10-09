import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TransactionEntity,
  TransactionQuery,
  TransactionResponse,
  TransactionSummaryQuery,
  TransactionSummaryResponse,
} from '../models/transaction.entity';
import { Repository } from 'typeorm';
import { BRANCH } from 'src/constants';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  createTransaction(
    transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(transaction);
  }

  async findAllTransaction(
    query: TransactionQuery,
  ): Promise<TransactionResponse> {
    const { branch, artist, page = 1, size = 10 } = query;
    const result = await this.transactionRepository.find({
      take: size,
      skip: (page - 1) * size,
      where: {
        branch_name: branch,
        nail_artist: artist,
      },
      order: { createdAt: 'DESC' },
    });

    const count = await this.transactionRepository.count({
      where: {
        branch_name: branch,
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

  async findTransactionSummaryByBranch({
    branch,
  }: TransactionSummaryQuery): Promise<TransactionSummaryResponse> {
    const total_transaction = await this.transactionRepository.sum(
      'total_price',
      {
        branch_name: branch,
      },
    );
    return {
      data: [
        {
          branch_name: branch,
          total_transaction,
        },
      ],
      total_transaction,
    };
  }
}
