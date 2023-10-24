import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PromotionEntity,
  PromotionQuery,
  PromotionResponse,
} from '../models/promotion.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Promotion } from '../models/promotion.interface';
import { Observable, from } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { BRANCH } from 'src/constants';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
    private jwtService: JwtService,
  ) {}

  async createItem(promotion: Promotion): Promise<Promotion> {
    return await this.promotionRepository.save(promotion);
  }

  async findAllItem(
    query: PromotionQuery,
    token: string,
  ): Promise<PromotionResponse> {
    const userData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const { isActive, page = 1, size = 10 } = query;
    const result = await this.promotionRepository.find({
      take: size,
      skip: (page - 1) * size,
      where: {
        ...(isActive && { isActive }),
        ...(userData.branch !== BRANCH.ALL_BRANCH && {
          branch: userData.branch,
        }),
      },
      order: { createdAt: 'DESC' },
    });

    const count = await this.promotionRepository.count({
      where: {
        ...(isActive && { isActive }),
        ...(userData.branch !== BRANCH.ALL_BRANCH && {
          branch: userData.branch,
        }),
      },
    });

    return {
      data: result,
      total: count,
    };
  }

  findItem(id: number): Observable<Promotion> {
    return from(this.promotionRepository.findOneBy({ id }));
  }

  async updateItem(id: number, promotion: Promotion): Promise<UpdateResult> {
    return await this.promotionRepository.update(id, promotion);
  }
}
