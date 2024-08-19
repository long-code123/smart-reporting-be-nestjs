import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../models/project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private readonly projectModel: typeof Project) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectModel.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.findAll();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectModel.findByPk(id);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel.findByPk(id);
    if (project) {
      return project.update(updateProjectDto);
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    const project = await this.projectModel.findByPk(id);
    if (project) {
      await project.destroy();
    }
  }
}
