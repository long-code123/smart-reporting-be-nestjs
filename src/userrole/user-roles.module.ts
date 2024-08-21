// src/user-role/user-role.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from '@src/models/user-role.model';
import { UserRoleService } from './user-roles.service';
import { UserRoleController } from './user-roles.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
