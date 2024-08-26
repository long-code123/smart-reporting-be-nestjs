import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Project } from '@src/models/project.model';
import { Role } from '@src/models/role.model';
import { UserProject } from '@src/models/user-project.model';
import { UserRole } from '@src/models/user-role.model';
import { User } from '@src/models/user.model';
import * as dotenv from 'dotenv';

dotenv.config();

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: process.env.DATABASE_DIALECT as 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [User, Role, UserRole, Project, UserProject],
  autoLoadModels: true,
  synchronize: true,
};
