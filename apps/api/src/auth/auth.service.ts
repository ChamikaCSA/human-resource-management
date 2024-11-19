import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, birthDate, phoneNumber, password } = createUserDto;
    if (!email || !firstName || !lastName || !birthDate || !phoneNumber || !password) {
      throw new BadRequestException('All fields are required');
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({ data: { email, firstName, lastName, birthDate: new Date(birthDate).toISOString(), phoneNumber, password: hashedPassword } });

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });

      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const newPayload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(newPayload, { expiresIn: '1h' });
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}