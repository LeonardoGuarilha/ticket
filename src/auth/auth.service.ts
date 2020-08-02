import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';

export interface IReturn {
  user: User;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ tokenAcesso: string }> {
    const nome = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!nome) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = { nome };
    const tokenAcesso = await this.jwtService.sign(payload);

    return { tokenAcesso };
  }
}
