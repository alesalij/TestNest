import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : 'FakeSecret',
    });
  }
  public async validate(payload: any) {
    console.log('strategy', payload);
    const user = await this.authService.validateTokenUser(
      payload.email,
      payload.id,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
