import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '../models/project.model';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.', type: Project })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects', type: [Project] })
  async findAll(): Promise<Project[]> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const projects = await this.projectService.findAll();
        resolve(projects);
      }, 3000);
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the project to retrieve' })
  @ApiResponse({ status: 200, description: 'The project with the specified ID', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the project to update' })
  @ApiResponse({ status: 200, description: 'The updated project', type: Project })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the project to delete' })
  @ApiResponse({ status: 204, description: 'The project has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
