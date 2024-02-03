import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	private logger: ConsoleLogger = new ConsoleLogger();

	async getHello(): Promise<string> {
		return 'Hello World!';
	}
}
