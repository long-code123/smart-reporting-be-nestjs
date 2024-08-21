import { IsInt, IsOptional } from 'class-validator';

export class UpdateUserRoleDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  roleId?: number;
}