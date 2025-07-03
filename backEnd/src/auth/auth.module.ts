import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { GoogleAuthGuard } from 'src/common/guards/googleAuth.guard';
import { HttpModule } from '@nestjs/axios';
import { EmailAuthGuard } from 'src/common/guards/emailAuth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' }, 
      }),
      inject: [ConfigService], 
    }),
    UsersModule,
    HttpModule
  ],
  controllers:[AuthController],
  providers: [AuthService, GoogleAuthGuard, EmailAuthGuard],
  exports: [GoogleAuthGuard, EmailAuthGuard]
})
export class AuthModule {}