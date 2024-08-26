import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../models/user.model';
import { UserDto } from './dto/user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { RolesGuard } from '../guards/roles.guard'; // Đường dẫn đến RolesGuard
import { Roles } from '@src/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Post()
  @Roles('admin') 
  @UseGuards(RolesGuard) 
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/dto')
  async findAllDto(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    console.log(users);
    return users.map(user => this.mapper.map(user, User, UserDto)); 
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Roles('admin') 
  @UseGuards(RolesGuard)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
