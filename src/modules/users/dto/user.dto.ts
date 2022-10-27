import { IsString, IsOptional } from 'class-validator';
export class UserDTO {
  @IsString()
  @IsOptional()
  public readonly id: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
