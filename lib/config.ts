export interface UserConfig {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Config {
  consumerKey: string;
  consumerSecret: string;
  domain: string;
  authorApiUrl: string;
  itemsApiUrl: string;
  user: UserConfig;
}

const config: Config = {
  consumerKey: process.env.LEARNOSITY_CONSUMER_KEY || '',
  consumerSecret: process.env.LEARNOSITY_CONSUMER_SECRET || '',
  domain: 'localhost',
  authorApiUrl: process.env.AUTHOR_API_URL || 'https://authorapi.learnosity.com/?latest-lts',
  itemsApiUrl: process.env.ITEMS_API_URL || 'https://items.learnosity.com/?latest-lts',
  user: {
    id: process.env.USER_ID || 'demos-site',
    email: process.env.USER_EMAIL || 'demo@example.com',
    firstname: process.env.USER_FIRSTNAME || 'Demo',
    lastname: process.env.USER_LASTNAME || 'User',
  },
};

export default config;
