import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from './mail.service';
import { UsersService } from 'src/users/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class InactivityReminderService {
  private readonly logger = new Logger(InactivityReminderService.name);

  constructor(
    private readonly mailService: MailService,
    @InjectModel(User.name) private _userModel: Model<User>
  ) {
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleInactivityReminders() {
    // const thresholdDate = new Date(Date.now() - 5 * 60 * 60 * 1000);
    const thresholdDate = new Date(Date.now() - 10 * 60 * 1000 );
    const inactiveUsers = await this._userModel.find({
      lastInteraction: { $lt: thresholdDate },
    });

    for (const user of inactiveUsers) {
        try {
          // await this.mailService.sendReminderEmail(user.email, user.name);
        } catch (error) {
          this.logger.error(`Failed to send reminder to ${user.email}`, error);
        }
      
    }
  }
}
