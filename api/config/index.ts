import path from 'path';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({
  allowEmptyValues: true,
  example: path.resolve(__dirname, '..', '.env.example'),
});

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  track: process.env.TRACK,
  secret: process.env.SECRET,
  db: {
    url: process.env.MAIN_MASTER_URL,
    db: process.env.MAIN_DATABASE,
    user: process.env.MAIN_USERNAME,
    pass: process.env.MAIN_PASSWORD,
  },
};

export { config };
