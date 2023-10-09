import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../services/user.service';
import { UserPost } from '../models/post.interface';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/role/role.decorator';
import { ROLE } from 'src/constants';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Roles(ROLE.DEV, ROLE.OWNER)
  async create(@Body() post: UserPost) {
    const { password } = post;

    const hashed = await bcrypt.hash(password, 12);
    return this.userService.createUser({
      ...post,
      password: hashed,
    });
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      branch: user.branch,
      username: user.username,
      role: user.role,
    });

    return {
      message: 'Success',
      data: {
        id: user.id,
        branch: user.branch,
        username: user.username,
        role: user.role,
        access_token: jwt,
      },
    };
  }

  @Get()
  async findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @Roles(ROLE.DEV, ROLE.OWNER, ROLE.BRANCH_OWNER)
  async update(@Param('id') id: number, @Body() post: UserPost) {
    return this.userService.updateUser(id, post);
  }
}
