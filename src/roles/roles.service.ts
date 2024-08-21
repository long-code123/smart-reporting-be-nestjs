// src/roles/role.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '@src/models/role.model';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<[number, Role[]]> {
    return this.roleModel.update(updateRoleDto, { where: { roleId: id }, returning: true });
  }

  async remove(id: number): Promise<void> {
    const role = await this.roleModel.findByPk(id);
    if (role) {
      await role.destroy();
    }
  }
}
