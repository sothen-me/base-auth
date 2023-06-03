import SendMailDTO from '@providers/mail/dtos/send-mail.dto';
import { MailProvider } from '@providers/mail/mail.provider';

export class TestMailProvider implements MailProvider {
  private messages: SendMailDTO[] = [];

  async sendMail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
