import { config } from '../config';
import { app } from './app';
import { log } from './utils/logs';

const { port, env, track } = config;

const startServer = async (): Promise<void> => {
  log.info('The microservice will start on the', track.toUpperCase(), 'environment.');
  app.listen(port);
  log.info(`Microservice started on ${port}`);
};

startServer();
