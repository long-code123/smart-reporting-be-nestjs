import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;
}
