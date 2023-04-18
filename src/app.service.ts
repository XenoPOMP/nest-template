import { ConsoleLogger, Injectable } from '@nestjs/common';
import MsSqlManager from '@/sql/MsSqlManager';

@Injectable()
export class AppService {
  private logger: ConsoleLogger = new ConsoleLogger();
  private msSqlManager: MsSqlManager = new MsSqlManager();

  async getHello(): Promise<string> {
    await this.msSqlManager
      .execQuery<string[]>(`SELECT * FROM [anyBase]`)
      .then((res) => {
        this.logger.log(res);
      });

    return 'Hello World!';
  }
}
