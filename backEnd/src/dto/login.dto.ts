import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ example: ''})
  @Expose()
  email: string;
  
  @ApiProperty({ example: ''})
  @Expose()
  password: string;
}