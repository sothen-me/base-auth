import { Module } from '@nestjs/common';
import { HashBcryptProvider } from './bcrypt/hash-bcrypt.provider';
import { HashProvider } from './hash.provider';

@Module({
  providers: [
    {
      provide: HashProvider,
      useClass: HashBcryptProvider,
    },
  ],
  exports: [HashProvider],
})
export class HashModule {}
