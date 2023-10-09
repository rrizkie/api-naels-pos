import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../models/role.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from '../models/role.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  createRole(role: Role): Observable<Role> {
    return from(this.roleRepository.save(role));
  }

  findAllRole(): Observable<Role[]> {
    return from(this.roleRepository.find());
  }

  findRole(id: number): Observable<Role> {
    return from(this.roleRepository.findOneBy({ id }));
  }

  updateRole(id: number, role: Role): Observable<UpdateResult> {
    return from(this.roleRepository.update(id, role));
  }
}
