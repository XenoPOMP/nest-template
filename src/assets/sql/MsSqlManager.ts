import { ConsoleLogger } from '@nestjs/common';
import * as sql from 'mssql';

import ISqlManager from '@/assets/sql/ISqlManager';

require('dotenv').config();
const { MS_SQL_USER, MS_SQL_SERVER } = process.env;

const config = {
	user: `user${MS_SQL_USER}_db`,
	password: `user${MS_SQL_USER}`,
	server: MS_SQL_SERVER,
	database: `user${MS_SQL_USER}_db`,
	options: {
		trustedconnection: true,
		enableArithAbort: true,
		instancename: '',
		trustServerCertificate: true,
	},
	port: 38325,
};

class MsSqlManager implements ISqlManager {
	logger: ConsoleLogger = new ConsoleLogger();

	public async execQuery<QResult>(query: string): Promise<QResult> {
		let pool = undefined;

		// prettier-ignore
		try {
      pool = await sql.connect(config).then((connection) => {
        this.logger.log(`Pool opened`);
        return connection;
      });

      let res = await pool
        .request()
        .query(query)
        .then((res) => {
          this.logger.log(`Request fulfilled successfully...`);
          return res;
        });

      this.logger.log(`Find ${res?.recordsets[0].length} results.`);
      return res.recordsets[0] as QResult;
    }
    catch (error) {
      this.logger.error(`${error}`);
    }
    finally {
      pool?.close();
      this.logger.log(`Pool closed.`);
    }
	}
}

export { MsSqlManager as default };
