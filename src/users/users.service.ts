import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.model'; // Import UserRole model
import { Role } from '../models/role.model'; // Import Role model
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole, // Inject UserRole model
    @InjectModel(Role) private readonly roleModel: typeof Role, // Inject Role model
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
    const newUser = { ...createUserDto, password: hashedPassword };
    return this.userModel.create(newUser);
  }

  async findOneByAccount(account: string): Promise<User> {
    return this.userModel.findOne({ where: { account } });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      return user.update(updateUserDto);
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }

  // Thêm phương thức để lấy vai trò của người dùng
  async getUserRoles(userId: number): Promise<string[]> {
    const userRoles = await this.userRoleModel.findAll({ where: { userId } });

    const roleIds = userRoles.map(userRole => userRole.roleId);

    const roles = await this.roleModel.findAll({
      where: {
        roleId: roleIds,
      },
    });

    return roles.map(role => role.roleName);
  }
}
