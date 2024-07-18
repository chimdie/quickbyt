import dotenv from 'dotenv';
dotenv.config();

export const environments = {
  dev: 'development',
  stg: 'staging',
  prd: 'production',
} as const;

export type EnvironmentKeys = keyof typeof environments;
export type Environments = (typeof environments)[EnvironmentKeys];

export const NODE_ENV: Environments = environments[(process.env.NODE_ENV as EnvironmentKeys) || 'dev'];

export const isProduction = (environment: Environments): boolean =>
  ['production', 'prd', 'prod'].includes(environment);

export const isStaging = (environment: Environments): boolean => ['stg', 'staging'].includes(environment);

export const isDevelopment = (environment: Environments): boolean =>
  ['dev', 'development'].includes(environment);

export const PORT = process?.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;
