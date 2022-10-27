import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { UserDocument, Users } from '../../mongoose/schemas/users.schema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async findOne(email: string): Promise<UserDTO | undefined> {
    return await this.UserModel.findOne({ email: email });
  }
}
