import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Roles } from 'src/role/role.decorator';
import { ROLE } from 'src/constants';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  @Roles(ROLE.DEV, ROLE.BRANCH_OWNER, ROLE.OWNER)
  create(@Body() item: Item): Observable<Item> {
    return this.itemService.createItem(item);
  }

  @Get()
  findAll(): Observable<Item[]> {
    return this.itemService.findAllItem();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Item> {
    return this.itemService.findItem(id);
  }

  @Put(':id')
  @Roles(ROLE.DEV, ROLE.BRANCH_OWNER, ROLE.OWNER)
  update(
    @Param('id') id: number,
    @Body() post: Item,
  ): Observable<UpdateResult> {
    return this.itemService.updateItem(id, post);
  }
}
