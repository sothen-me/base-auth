import SendMailDTO from './dtos/send-mail.dto';

export abstract class MailProvider {
  abstract sendMail(data: SendMailDTO): Promise<void>;
}
