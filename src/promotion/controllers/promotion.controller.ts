import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Promotion } from '../models/promotion.interface';
import { Roles } from 'src/role/role.decorator';
import { ROLE } from 'src/constants';
import { PromotionService } from '../services/item.service';

@Controller('promotion')
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @Post()
  @Roles(ROLE.DEV, ROLE.BRANCH_OWNER, ROLE.OWNER)
  create(@Body() promotion: Promotion) {
    return this.promotionService.createItem(promotion);
  }

  @Get()
  findAll() {
    return this.promotionService.findAllItem();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.promotionService.findItem(id);
  }

  @Put(':id')
  @Roles(ROLE.DEV, ROLE.BRANCH_OWNER, ROLE.OWNER)
  update(@Param('id') id: number, @Body() post: Promotion) {
    return this.promotionService.updateItem(id, post);
  }
}
