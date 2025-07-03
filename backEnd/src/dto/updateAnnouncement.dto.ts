import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAnnouncementDto {

    @ApiProperty({ example: ''})
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    announcementId: string;

    @ApiProperty({ example: ''})
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    title?: string;

    @ApiProperty({ example: ''})
    @IsString()
    @IsNotEmpty()
    @MaxLength(400)
    description?: string;
}