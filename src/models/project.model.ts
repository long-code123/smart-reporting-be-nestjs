import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { UserProject } from './user-project.model';
import { User } from './user.model';

@Table
export class Project extends Model<Project> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  projectId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  projectName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  cost: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  progress: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @BelongsToMany(() => User, () => UserProject)
  users: User[];
}
