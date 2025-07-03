import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { GoogleAuthGuard } from './common/guards/googleAuth.guard';
import { JwtGuard } from './common/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/bookclub4'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ScheduleModule.forRoot(),
    BooksModule,
    AnnouncementsModule,
    DiscussionsModule,
    UsersModule,
    HttpModule,
    SharedModule,
    AuthModule,
  ],
  providers:[GoogleAuthGuard, JwtGuard],
  exports:[GoogleAuthGuard, JwtGuard]
})
export class AppModule {}
