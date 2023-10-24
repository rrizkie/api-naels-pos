import { Module } from '@nestjs/common';
import { PromotionService } from './services/promotion.service';
import { PromotionController } from './controllers/promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './models/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
  providers: [PromotionService],
  controllers: [PromotionController],
})
export class PromotionModule {}
