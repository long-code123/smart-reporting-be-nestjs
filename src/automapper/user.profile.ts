import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import { User } from '../models/user.model';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { UserDto } from '@src/users/dto/user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      console.log('Creating mapping from User to UserDto');
      createMap(
        mapper,
        User,
        UserDto
      );
      console.log('Mapping from User to UserDto created successfully');
    };
  }
}
