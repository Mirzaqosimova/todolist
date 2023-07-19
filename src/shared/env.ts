import * as dotenv from 'dotenv';
dotenv.config();
const { env } = process;

export const DB_USER = env.DB_USER;
export const DB_NAME = env.DB_NAME;
export const DB_PASSWORD = env.DB_PASSWORD;
