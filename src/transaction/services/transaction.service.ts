import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../models/transaction.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../models/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  findAllTransaction(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
}
