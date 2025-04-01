import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'ชื่อผู้ใช้',
    example: 'ammarin_dev',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'รหัสผ่าน',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}