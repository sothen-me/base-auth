import { compare, hash } from 'bcryptjs';
import { HashProvider } from '../hash.provider';

export class HashBcryptProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
