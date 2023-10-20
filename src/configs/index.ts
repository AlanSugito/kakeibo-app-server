import logger from "./logger";
import server from "./server";
import prisma from "./prisma";
import storage from "./storage";
import process from "./process";
import oauthClient from "./oauthClient";

const { AT_SECRET, RT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process;

export {
  logger,
  server,
  prisma,
  storage,
  oauthClient,
  AT_SECRET,
  RT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
