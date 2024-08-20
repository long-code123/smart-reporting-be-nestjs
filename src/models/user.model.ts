import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { UserProject } from './user-project.model';
import { Project } from './project.model';
import { AutoMap } from '@automapper/classes';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @AutoMap()
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @AutoMap()
  sex: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  identityCard: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @AutoMap()
  contract: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @AutoMap()
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  account: string;z

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

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

  @BelongsToMany(() => Project, () => UserProject)
  projects: Project[];
}
