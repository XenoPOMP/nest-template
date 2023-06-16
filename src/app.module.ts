import { Module } from '@nestjs/common';
import { MysqlModule } from 'nest-mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		// MysqlModule.forRootAsync({
		// 	useFactory: () => ({
		// 		host: process.env.MYSQL_HOST,
		// 		database: process.env.MYSQL_DATABASE,
		// 		user: process.env.MYSQL_USER,
		// 		password: process.env.MYSQL_PASSWORD,
		// 		port: parseInt(process.env.MYSQL_PORT),
		// 	}),
		// }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
