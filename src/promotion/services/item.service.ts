import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionEntity } from '../models/promotion.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Promotion } from '../models/promotion.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  createItem(promotion: Promotion): Observable<Promotion> {
    return from(this.promotionRepository.save(promotion));
  }

  findAllItem(): Observable<Promotion[]> {
    return from(
      this.promotionRepository.find({
        where: {
          isActive: true,
        },
      }),
    );
  }

  findItem(id: number): Observable<Promotion> {
    return from(this.promotionRepository.findOneBy({ id }));
  }

  updateItem(id: number, promotion: Promotion): Observable<UpdateResult> {
    return from(this.promotionRepository.update(id, promotion));
  }
}
