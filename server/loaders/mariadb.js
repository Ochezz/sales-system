import config from "~config";
import mariadb from "mariadb";
import logger from '~logger';

const pool = mariadb.createPool({
  host: config.databaseURL,
  database: config.databaseNAME,
  user: config.databaseUSER,
  password: config.databasePW,
  connectionLimit: 10
});

const safeParm = (data) => pool.escape(data);

const excute = async (query) => {
  let result;
  try{
    result = await pool.query(query);
  } catch (e) {
    logger.error(e);
    await mariadbLoader();
    result = await pool.query(query)
  }
  return result
}

const mariadbLoader = async () => {
  await pool.query(`USE ${config.databaseNAME}`);
  logger.info('MariaDB Connected');
}
export { safeParm, excute, mariadbLoader };
