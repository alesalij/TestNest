import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: UserDTO = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      console.log(user);
      console.log(process.env.JWT_SECRET);
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      console.log('authService validate', result);
      return result;
    }
    return null;
  }

  async validateTokenUser(email: string, id: string): Promise<any> {
    const user: UserDTO = await this.usersService.findOne(email);
    console.log('validateTokenUser', user);

    if (user && user.id === id) {
      console.log(user);

      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      console.log('authService validate', result);
      return result;
    }
    return null;
  }
  async signin(user: UserDTO) {
    const payload = {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
    };
    console.log('signin', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
