import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../models/project.model';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';
import { StatusValidationMiddleware } from '../middlewares/status-validation.middleware'; 
import { CreateProjectDto } from './dto/create-project.dto';
import { ResponseTimeMiddleware } from '@src/middlewares/response-time.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StatusValidationMiddleware) 
      .forRoutes({ path: 'projects', method: RequestMethod.POST });
  }
}
