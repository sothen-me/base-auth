import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import ISendMailDTO from '../dtos/send-mail.dto';
import { MailProvider } from '../mail.provider';

@Injectable()
export class EtherealMailProvider implements MailProvider {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ to, from, subject, templateData }: ISendMailDTO) {
    try {
      await this.mailerService.sendMail({
        from: {
          name: from?.name || 'Sothen.me',
          address: from?.email || 'no-reply@sothen.me',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        template: templateData.file,
        context: templateData.variables,
      });
    } catch {
      console.log('Something is wrong when send mail');
    }
  }
}
