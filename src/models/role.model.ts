import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './user-role.model';

@Table
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  roleId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['user', 'admin']], 
    },
  })
  roleName: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
