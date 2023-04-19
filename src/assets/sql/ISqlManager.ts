import { ConsoleLogger } from '@nestjs/common';

interface ISqlManager {
  logger: ConsoleLogger;
  execQuery<QResult>(query: string): Promise<QResult>;
}

export default ISqlManager;
