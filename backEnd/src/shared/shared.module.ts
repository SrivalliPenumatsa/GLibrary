import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MailService } from './mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { HttpModule } from '@nestjs/axios';
import { InactivityReminderService } from './ramainder.service';
import { SseService } from './sse.service';

@Module({
  imports: [UsersModule, 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    HttpModule,
  ],
  providers: [
    MailService, InactivityReminderService, SseService
  ],
  exports: [ MailService, SseService],
})
export class SharedModule {};