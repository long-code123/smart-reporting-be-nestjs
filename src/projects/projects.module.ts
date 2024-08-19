import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../models/project.model';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectsModule {}
