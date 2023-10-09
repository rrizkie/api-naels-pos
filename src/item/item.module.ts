import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './models/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
