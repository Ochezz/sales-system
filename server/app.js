import express from 'express';
import config from '~config';
import logger from '~logger';
import loaders from '~loaders';

const app = express();

loaders(app);

const server = app.listen(config.port, () => {
  logger.info(`
    ################################################
    ##  Server listening on port: ${config.port}  ##
    ################################################
  `);
}).on('error', err => {
  logger.error(err);
  process.exit(1);
});

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    logger.info(r.route.path)
  }
})

export { server }