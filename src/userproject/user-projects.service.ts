import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProject } from '../models/user-project.model';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectModel(UserProject)
    private userProjectModel: typeof UserProject
  ) {}

  create(createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectModel.create(createUserProjectDto);
  }

  findAll() {
    return this.userProjectModel.findAll();
  }

  findOne(id: number) {
    return this.userProjectModel.findByPk(id);
  }

  update(id: number, updateUserProjectDto: UpdateUserProjectDto) {
    return this.userProjectModel.update(updateUserProjectDto, {
      where: { userProjectId: id },
      returning: true
    }).then(([_, [updatedUserProject]]) => updatedUserProject);
  }

  remove(id: number) {
    return this.userProjectModel.destroy({
      where: { userProjectId: id }
    });
  }
}
