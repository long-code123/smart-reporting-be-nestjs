import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UserRole } from '@src/models/user-role.model';
import { Role } from '@src/models/role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, Role])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
