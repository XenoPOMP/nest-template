import SqlManager from './SqlManager';

const sql = require('mssql');
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

class MsSqlManager extends SqlManager {
  private messagePrefix: string = clc.blueBright('[MSSQL]');

  public async execQuery<QResult>(query: string): Promise<QResult> {
    // prettier-ignore
    try {
      let pool = await sql.connect(config);
      console.log(`${this.messagePrefix} SQL Server connected...`);

      let res = await pool.request().query(query).then(res => {
        console.log(`${this.messagePrefix} Request fulfilled successfully...`);
        return res;
      });
      return res.recordsets;
    }
    catch (error) {
      console.log(`${this.messagePrefix} ${clc.red('mathus-error')}: ${error}`);
    }
  }
}

export { MsSqlManager as default };
