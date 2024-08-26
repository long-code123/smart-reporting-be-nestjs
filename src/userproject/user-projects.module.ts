import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProject } from '../models/user-project.model';
import { UserProjectsService } from './user-projects.service';
import { UserProjectsController } from './user-projects.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserProject])],
  controllers: [UserProjectsController],
  providers: [UserProjectsService],
  exports: [UserProjectsService],
})
export class UserProjectsModule {}
