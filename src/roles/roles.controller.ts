
import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return this.roleService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
