import { Module } from '@nestjs/common';
import { EtherealMailProvider } from './ethereal/ethereal-mail.provider';
import { MailProvider } from './mail.provider';

@Module({
  providers: [
    {
      provide: MailProvider,
      useClass: EtherealMailProvider,
    },
  ],
  exports: [MailProvider],
})
export class MailModule {}
