import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Project } from './models/project.model';
import { UserProject } from './models/user-project.model';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { UserProjectsModule } from './userproject/user-projects.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Project, UserProject],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Project, UserProject]),
    UsersModule,
    ProjectsModule,
    UserProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
