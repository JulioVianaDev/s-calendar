import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async loginUser(data: { email: string; password: string }) {
        const { email, password } = data;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorrect password!');
        }
        const token = this.jwtService.sign({ userId: user.id }, { secret: process.env.JWT_SECRET, expiresIn: 120 },);

        return { token };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
