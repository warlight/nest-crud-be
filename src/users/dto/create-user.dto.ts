import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string;
}
