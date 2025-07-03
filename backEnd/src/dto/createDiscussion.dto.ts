import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDiscussionDto {
    @ApiProperty({ example: ''})
    @IsString()
    @IsNotEmpty()
    bookId: string;
  
    @ApiProperty({ example: ''})
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    content: string;
}