import dotenv from 'dotenv';

let envFile;

if (process.env.NODE_ENV === 'production') {
  envFile = '.env';
} else if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else {
  envFile = '.env.dev';
}

dotenv.config({ path: envFile });
