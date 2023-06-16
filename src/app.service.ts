import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';

@Injectable()
export class AppService {
	// constructor(@InjectClient() private readonly connection: Connection) {}

	private logger: ConsoleLogger = new ConsoleLogger();

	async getHello(): Promise<string> {
		return 'Hello World!';
	}
}
