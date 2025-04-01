import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'เข้าสู่ระบบสำเร็จ ได้รับ JWT token',
  })
  @ApiResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
  async login(@Body() loginDto: LoginDto) {
    
    const user = { userId: 1, username: loginDto.username };
    return this.authService.login(user);
  }
}