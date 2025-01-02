import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('login')
    async loginUser(@Body() body: { email: string; password: string }) {
        return this.authService.loginUser(body);
    }

    @Post('validate')
    @UseGuards(AuthGuard('jwt'))
    async validateToken(@Req() req: any) {
        return req.user;
    }
}
