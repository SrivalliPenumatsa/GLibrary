import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {    
    sgMail.setApiKey((this.configService.get<string>('SENDGRID_API_KEY')!));
  }

  async sendReminderEmail(to: string, name: string) {
    console.log("SENDGRID_FROM_EMAIL ",this.configService.get<string>('SENDGRID_FROM_EMAIL')!);
        const msg = {
            to,
            from: this.configService.get<string>('SENDGRID_FROM_EMAIL')!,
            subject: `Hey ${name}, we miss you at Glass Library!`,
            html: `
              <h2>Hello ${name},</h2>
              <p>It looks like you haven't visited <strong>Glass Library</strong> in a while.</p>
              <a href="" style="padding: 10px 20px; background-color: #4B0082; color: white; text-decoration: none; border-radius: 4px;">Return to Glass Library</a>
              <p>Happy Reading! 📖</p>
            `,
          };
      
          try {
            await sgMail.send(msg);
            this.logger.log(`Reminder email sent to ${to}`);
          } catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error);
          }
  }
}
