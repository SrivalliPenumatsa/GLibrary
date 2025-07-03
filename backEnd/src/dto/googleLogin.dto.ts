import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class GoogleLoginDto {
  @ApiProperty({ example: ''})
  @Expose()
  email: string;
  
  @ApiProperty({ example: ''})
  @Expose()
  name: string;
}