import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String,  description: 'email'})
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: Number,  description: 'email'})
    age: number;
}