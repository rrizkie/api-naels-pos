import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserPostEntity } from '../models/post.entity';
import { UserPost } from '../models/post.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserPostEntity)
    private readonly userPostRepository: Repository<UserPostEntity>,
  ) {}

  createUser(userPost: UserPost): Promise<UserPost> {
    return this.userPostRepository.save(userPost);
  }

  findOne(username: string): Promise<UserPost> {
    return this.userPostRepository.findOne({
      where: {
        username,
      },
    });
  }

  findAllUser(): Promise<UserPost[]> {
    return this.userPostRepository.find();
  }

  findUserById(id: number): Promise<UserPost> {
    return this.userPostRepository.findOneBy({ id });
  }

  updateUser(id: number, userPost: UserPost): Promise<UpdateResult> {
    return this.userPostRepository.update(id, userPost);
  }
}
