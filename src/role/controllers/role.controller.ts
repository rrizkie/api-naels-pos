import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { Roles } from '../role.decorator';
import { ROLE } from 'src/constants';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @Roles(ROLE.DEV, ROLE.OWNER)
  create(@Body() role: Role): Observable<Role> {
    return this.roleService.createRole(role);
  }

  @Get()
  findAll(): Observable<Role[]> {
    return this.roleService.findAllRole();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Role> {
    return this.roleService.findRole(id);
  }

  @Put(':id')
  @Roles(ROLE.DEV, ROLE.OWNER)
  update(
    @Param('id') id: number,
    @Body() post: Role,
  ): Observable<UpdateResult> {
    return this.roleService.updateRole(id, post);
  }
}
