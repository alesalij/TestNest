
import {IsString,IsDefined,IsOptional} from 'class-validator'
export class CreateBookDTO{
    @IsString()
@IsOptional()

    public readonly id: string;

    @IsString()
    @IsDefined()
    public title: string;
    
    @IsString()
    @IsOptional()
    public description: string;
   
    @IsString()
    @IsDefined()
    public authors: string;
    
    @IsString()
    @IsOptional()
    public favorite: string;
    
    @IsString()
    @IsOptional()
    public fileCover: string;
    
    @IsString()
    @IsOptional()
    public fileName: string;
    

  }