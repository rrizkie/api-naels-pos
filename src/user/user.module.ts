import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserPostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPostEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
