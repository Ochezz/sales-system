import { mariadbLoader } from './mariadb.js';
import expressLoader from './express.js';
import errorHandler from './errorHandler.js';
import { extRegist } from '~utils/extension.js';

export default (app) => {
    extRegist()
    mariadbLoader();
    expressLoader(app);
    errorHandler(app);
};