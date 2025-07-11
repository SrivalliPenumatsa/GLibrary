import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  token: string;
}