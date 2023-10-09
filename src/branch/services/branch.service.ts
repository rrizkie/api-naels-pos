import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchEntity } from '../models/branch.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Branch } from '../models/branch.interface';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  createBranch(role: Branch): Observable<Branch> {
    return from(this.branchRepository.save(role));
  }

  findAllBranch(): Observable<Branch[]> {
    return from(
      this.branchRepository.find({
        where: { isActive: true, isDeleted: false },
      }),
    );
  }

  findBranch(id: number): Observable<Branch> {
    return from(this.branchRepository.findOneBy({ id }));
  }

  updateBranch(id: number, role: Branch): Observable<UpdateResult> {
    return from(this.branchRepository.update(id, role));
  }
}
