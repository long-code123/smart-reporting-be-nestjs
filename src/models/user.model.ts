import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { UserProject } from './user-project.model';
import { Project } from './project.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  sex: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  @ApiProperty()
  dateOfBirth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  identityCard: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  contract: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  account: string;

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
