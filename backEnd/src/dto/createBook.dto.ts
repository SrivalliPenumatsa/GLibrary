import { Genre } from "src/common/enums/genre.enum";
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateBookDto{
    @ApiProperty({ example: ''})
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: ''})
    @IsNotEmpty()
    author: string;

    @ApiProperty({ example: ''})
    @IsEnum(Genre)
    genre: Genre;

    @ApiProperty({ example: ''})
    @IsNotEmpty()
    description: string;
}