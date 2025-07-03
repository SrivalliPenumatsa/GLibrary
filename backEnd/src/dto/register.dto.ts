import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ example: ''})
  @Expose()
  email: string;

  @ApiProperty({ example: ''})
  @Expose()
  password: string;
  
  @ApiProperty({ example: ''})
  @Expose()
  username: string;
}