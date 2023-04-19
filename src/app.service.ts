import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Connection } from 'mysql2';

@Injectable()
export class AppService {
  constructor(@InjectClient() private readonly connection: Connection) {}

  private logger: ConsoleLogger = new ConsoleLogger();

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
