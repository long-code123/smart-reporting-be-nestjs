// src/user-role/user-role.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserRoleService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from '@src/models/user-role.model';

@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  async findAll(): Promise<UserRole[]> {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserRole> {
    return this.userRoleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userRoleService.remove(id);
  }
}
