import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsDecimal, IsIn } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  readonly projectName: string;

  @ApiPropertyOptional({ enum: ['active', 'inactive'], description: 'The status of the project' })
  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive'])
  readonly status?: string;

  @ApiPropertyOptional({ description: 'The cost of the project', example: 10000.00 })
  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  readonly cost?: number;

  @ApiPropertyOptional({ description: 'The progress percentage of the project', example: 75 })
  @IsNumber()
  @IsOptional()
  readonly progress?: number;

  @ApiPropertyOptional({ description: 'The start date of the project', type: String, format: 'date-time' })
  @IsDate()
  @IsOptional()
  readonly startDate?: Date;

  @ApiPropertyOptional({ description: 'The end date of the project', type: String, format: 'date-time' })
  @IsDate()
  @IsOptional()
  readonly endDate?: Date;
}
