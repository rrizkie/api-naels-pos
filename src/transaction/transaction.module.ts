import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './models/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
