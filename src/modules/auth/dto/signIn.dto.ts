import { IsString, IsOptional } from 'class-validator';
export class signInDTO {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}
