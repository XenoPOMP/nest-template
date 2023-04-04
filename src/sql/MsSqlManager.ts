import * as sql from 'mssql';
require('dotenv').config();
const env = process.env;
const clc = require('cli-color');

const config = {
  user: `${env.MS_SQL_USER}_db`,
  password: `${env.MS_SQL_USER}`,
  server: `stud-mssql.sttec.yar.ru`,
  database: `${env.MS_SQL_USER}_db`,
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: '',
    trustServerCertificate: true,
  },
  port: 38325,
};

class MsSqlManager {
  private messagePrefix: string = clc.blueBright('[MSSQL]');

  private logTime(): string {
    const date = new Date();

    const refactorDate = (input: number): string => {
      if (input < 10) {
        return `0${input}`;
      }

      return `${input}`;
    };

    const day = (): string => refactorDate(date.getDate());
    const month = (): string => refactorDate(date.getMonth() + 1);
    const year = (): string => refactorDate(date.getFullYear());

    const hours = (): string => refactorDate(date.getHours());
    const minutes = (): string => refactorDate(date.getMinutes());
    const seconds = (): string => refactorDate(date.getSeconds());

    return clc.blueBright(
      `[${day()}.${month()}.${year()}] [${hours()}:${minutes()}:${seconds()}]`,
    );
  }

  public async execQuery<QResult>(query: string): Promise<QResult> {
    console.log(
      '========================== Query start ==========================',
    );

    let pool;

    // prettier-ignore
    try {
      pool = await sql.connect(config);
      console.log(`${this.messagePrefix} ${this.logTime()} SQL Server connected...`);

      let res = await pool.request().query(query).then(res => {
        console.log(`${this.messagePrefix} ${this.logTime()} Request fulfilled successfully...`);
        return res;
      });

      console.log(`${this.messagePrefix} ${this.logTime()} Find ${res?.recordsets[0].length} results.`);

      console.log('=========================== Query end ===========================');
      return res.recordsets;
    }
    catch (error) {
      console.log(`${this.messagePrefix} ${this.logTime()} ${clc.red('mathus-error')}: ${error}`);
    }
    finally {
      pool.close();
    }

    console.log(
      '========================== Query end ==========================',
    );
  }
}

export { MsSqlManager as default };
