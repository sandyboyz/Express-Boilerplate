import express from 'express';
import config from './app/config';
import loaderApp from './app';
import { logger } from './app/logger';

const app = express();

// Load App
loaderApp(app);

app.listen(config.app.PORT as number, config.app.HOST, () => {
  logger.info({}, `Server listen on PORT ${config.app.PORT}`);
});
