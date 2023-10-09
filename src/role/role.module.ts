import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { RoleEntity } from './models/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
