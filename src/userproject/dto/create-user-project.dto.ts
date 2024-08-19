import { IsInt, IsOptional, IsDecimal, IsString, IsDate } from 'class-validator';

export class CreateUserProjectDto {
  @IsInt()
  readonly userId: number;

  @IsInt()
  readonly projectId: number;

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  readonly effort?: number;

  @IsString()
  @IsOptional()
  readonly roleInProject?: string;

  @IsDate()
  @IsOptional()
  readonly joinDate?: Date;

  @IsDate()
  @IsOptional()
  readonly exitDate?: Date;
}
