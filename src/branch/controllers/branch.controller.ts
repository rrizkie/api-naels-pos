import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { Branch } from '../models/branch.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Roles } from 'src/role/role.decorator';
import { ROLE } from 'src/constants';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  @Roles(ROLE.DEV, ROLE.OWNER)
  create(@Body() branch: Branch): Observable<Branch> {
    return this.branchService.createBranch(branch);
  }

  @Get()
  findAll(): Observable<Branch[]> {
    return this.branchService.findAllBranch();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Branch> {
    return this.branchService.findBranch(id);
  }

  @Put(':id')
  @Roles(ROLE.DEV, ROLE.OWNER)
  update(
    @Param('id') id: number,
    @Body() post: Branch,
  ): Observable<UpdateResult> {
    return this.branchService.updateBranch(id, post);
  }
}
