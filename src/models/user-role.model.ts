import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

@Table
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;
}
