import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';

@Table
export class UserProject extends Model<UserProject> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  userProjectId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  projectId: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  effort: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  roleInProject: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  joinDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  exitDate: Date;
}
