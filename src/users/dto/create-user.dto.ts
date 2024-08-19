import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly userName: string;

  @IsString()
  @IsOptional()
  readonly sex?: string;

  @IsDate()
  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  readonly identityCard?: string;

  @IsString()
  @IsOptional()
  readonly contract?: string;

  @IsString()
  @IsOptional()
  readonly role?: string;

  @IsString()
  readonly account: string;

  @IsString()
  readonly password: string;

  @IsDate()
  @IsOptional()
  readonly startDate?: Date;

  @IsDate()
  @IsOptional()
  readonly endDate?: Date;
}
