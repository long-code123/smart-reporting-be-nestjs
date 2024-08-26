import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.model'; 
import { Role } from '../models/role.model'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole, 
    @InjectModel(Role) private readonly roleModel: typeof Role,
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

  async exportUsersToExcel(res: Response): Promise<void> {
    try {
      // Tạo workbook và worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');

      // Định nghĩa các cột
      worksheet.columns = [
        { header: 'ID', key: 'userId', width: 10 },
        { header: 'User Name', key: 'userName', width: 30 },
        { header: 'Sex', key: 'sex', width: 10 },
        { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
        { header: 'Identity Card', key: 'identityCard', width: 20 },
        { header: 'Contract', key: 'contract', width: 15 },
        { header: 'Position', key: 'position', width: 20 },
        { header: 'Account', key: 'account', width: 20 },
        { header: 'Start Date', key: 'startDate', width: 20 },
        { header: 'End Date', key: 'endDate', width: 20 },
      ];

      // Lấy dữ liệu từ database
      const users = await this.findAll(); // Giả sử bạn có phương thức findAll() trả về danh sách người dùng

      // Thêm dữ liệu vào worksheet
      users.forEach(user => {
        worksheet.addRow(user);
      });

      // Cài đặt header và gửi file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

      await workbook.xlsx.write(res); // Ghi dữ liệu vào response stream
      res.end(); // Kết thúc response
    } catch (error) {
      res.status(500).send('Error generating Excel file.');
    }
  }
}