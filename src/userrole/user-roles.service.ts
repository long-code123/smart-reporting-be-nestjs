// src/user-role/user-roles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from '@src/models/user-role.model';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole)
    private readonly userRoleModel: typeof UserRole,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleModel.create(createUserRoleDto);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleModel.findAll();
  }

  async findOne(id: number): Promise<UserRole> {
    const userRole = await this.userRoleModel.findByPk(id);
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    const userRole = await this.userRoleModel.findByPk(id);
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return userRole.update(updateUserRoleDto);
  }

  async remove(id: number): Promise<void> {
    const userRole = await this.userRoleModel.findByPk(id);
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    await userRole.destroy();
  }
}
