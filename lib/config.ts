export interface UserConfig {
  id: string;
  email: string;
}

export interface Config {
  consumerKey: string;
  consumerSecret: string;
  domain: string;
  user: UserConfig;
}

const config: Config = {
  consumerKey: process.env.LEARNOSITY_CONSUMER_KEY || "",
  consumerSecret: process.env.LEARNOSITY_CONSUMER_SECRET || "",
  domain: "localhost",
  user: {
    id: process.env.USER_ID || "demos-site",
    email: process.env.USER_EMAIL || "demo@example.com",
  },
};

export default config;
