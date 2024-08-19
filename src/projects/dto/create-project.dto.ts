import { IsString, IsOptional, IsDate, IsNumber, IsDecimal } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly projectName: string;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  readonly cost?: number;

  @IsNumber()
  @IsOptional()
  readonly progress?: number;

  @IsDate()
  @IsOptional()
  readonly startDate?: Date;

  @IsDate()
  @IsOptional()
  readonly endDate?: Date;
}
