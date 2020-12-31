import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import compress from 'compression';
import { routes } from './routes';

class App {
  public express: Express;

  public constructor() {
    this.express = express();
    this.config();
  }

  public config(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(compress());
    this.express.use(methodOverride());
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use('/', routes);
  }
}

const app = new App().express;

export { app };
