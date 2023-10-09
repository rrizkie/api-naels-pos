import { Module } from '@nestjs/common';
import { BranchService } from './services/branch.service';
import { BranchController } from './controllers/branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './models/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
