import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { UserRole } from './models/user-role.model';
import { Project } from './models/project.model';
import { UserProject } from './models/user-project.model';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { UserProjectsModule } from './userproject/user-projects.module';
import { AuthModule } from './auth/auth.module'; 
import { AuthMiddleware } from './middlewares/authen.middleware'; 
import * as dotenv from 'dotenv';
import { ResponseTimeMiddleware } from './middlewares/response-time.middleware';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { Error404Middleware } from './middlewares/error404.middleware';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfile } from './automapper/user.profile';
import { RoleModule } from './roles/roles.module';
import { UserRoleModule } from './userrole/user-roles.module';
import { UploadModule } from './upload/upload.module';
import { sequelizeConfig } from './configs/db.configs';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([User, Role, UserRole, Project, UserProject]),
    UsersModule,
    ProjectsModule,
    AuthModule, 
    RoleModule,
    UserRoleModule,
    UserProjectsModule,
    UploadModule,
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
      .apply(ResponseTimeMiddleware) 
      .forRoutes('*')

      .apply(ErrorMiddleware) 
      .forRoutes('*')

      .apply(Error404Middleware) 
      .forRoutes('*')

      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },  
        { path: 'auth/refresh', method: RequestMethod.POST }  
      )
      .forRoutes('*'); 
  }
}
