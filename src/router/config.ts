import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../../.env' });

export const DATA_FILE = process.env.DATA_FILE;
export const USER = process.env.USER;
export const PASSW = process.env.PASSW;
export const CLUSTER = process.env.CLUSTER;
export const PORT = process.env.PORT;
