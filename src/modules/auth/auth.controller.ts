/* eslint-disable @typescript-eslint/ban-types */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  UseGuards,
  UnauthorizedException,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserDocument } from '../../mongoose/schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { AuthService } from './auth.service';
// import { user } from './types';
// import { CreateUserDTO } from './dto/create-user.dto';
// import { user as UpdateUserDto } from './types';
// import { paramId as IParamId } from './types';
// import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { signInDTO } from './dto/signIn.dto';
// import { LocalStrategy } from '../auth/strategies/local.strategy';
//import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserDTO } from '../users/dto/user.dto';

// @UseInterceptors(LoggingInterceptor)
@Controller('/api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signup')
  // signUp(@Body() data: CreateUserDTO) {
  //   console.log('jsonData', data);
  //   this.authService.signUp(data);
  // }

  @Post('/signin')
  async signIn(@Body() data: signInDTO) {
    const user: UserDTO = await this.authService.validateUser(
      data.email,
      data.password,
    );
    console.log('jsonDatauser', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.signin(user);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('/passport/signin')
  @UseGuards(JwtAuthGuard)
  passportSignIn(@Request() req, @Body() data: signInDTO) {
    console.log('tut12');
    return this.authService.signin(req.user);
  }
}
