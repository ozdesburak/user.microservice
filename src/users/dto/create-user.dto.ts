import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;
}