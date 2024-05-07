import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './model/dto/login.dto';
import { IJwtToken } from './model/interfaces/jwt-token.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async login(@Body() body: LoginDTO): Promise<IJwtToken> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.signIn(user);
    return token;
  }
}
