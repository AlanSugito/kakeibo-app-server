import dotenv from "dotenv";
dotenv.config();

const configs = {
  RT_SECRET: process.env.RT_SECRET!,
  AT_SECRET: process.env.AT_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
};

export default configs;
