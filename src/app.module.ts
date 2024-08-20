import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Project } from './models/project.model';
import { UserProject } from './models/user-project.model';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { UserProjectsModule } from './userproject/user-projects.module';
import * as dotenv from 'dotenv';
import { ResponseTimeMiddleware } from './middlewares/response-time.middleware';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { Error404Middleware } from './middlewares/error404.middleware';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfile } from './automapper/user.profile';

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
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [],
  providers: [UserProfile],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseTimeMiddleware) // Đặt middleware đo thời gian phản hồi đầu tiên
      .forRoutes('*')

      .apply(ErrorMiddleware) // Đặt middleware xử lý lỗi sau đó
      .forRoutes('*')

      // Đặt middleware xử lý lỗi 404 cuối cùng
      .apply(Error404Middleware) 
      .forRoutes('*');
  }
}
