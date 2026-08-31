// Dynamic Expo config: reads BGG_API_TOKEN from env and passes to app via extra.
// For local dev: set BGG_API_TOKEN in .env (see .env.example). dotenv loads it.
// For EAS Build: use `eas secret:create --name BGG_API_TOKEN --value "your-token"`.
import * as path from 'path';
import * as dotenv from 'dotenv';
import baseConfig from './app.json';

dotenv.config({ path: path.join(__dirname, '.env') });

export default {
  ...baseConfig,
  expo: {
    ...baseConfig.expo,
    extra: {
      bggApiToken: process.env.BGG_API_TOKEN || '',
    },
  },
};
