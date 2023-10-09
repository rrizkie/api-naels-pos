import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../models/item.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Item } from '../models/item.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  createItem(item: Item): Observable<Item> {
    return from(this.itemRepository.save(item));
  }

  findAllItem(): Observable<Item[]> {
    return from(this.itemRepository.find());
  }

  findItem(id: number): Observable<Item> {
    return from(this.itemRepository.findOneBy({ id }));
  }

  updateItem(id: number, role: Item): Observable<UpdateResult> {
    return from(this.itemRepository.update(id, role));
  }
}
