import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly sex?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly identityCard?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly contract?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly role?: string;

  @IsString()
  @ApiProperty()
  readonly account: string;

  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly startDate?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly endDate?: Date;
}
