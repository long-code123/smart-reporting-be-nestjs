// dto/user.dto.ts
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User Name' })
  @AutoMap()
  userName: string;

  @ApiProperty({ description: 'Sex' })
  @AutoMap()
  sex: string;

  @ApiProperty({ description: 'Contract' })
  @AutoMap()
  contract: string;

  @ApiProperty({ description: 'Role' })
  @AutoMap()
  role: string;

  // Thêm các thuộc tính khác nếu cần
}
