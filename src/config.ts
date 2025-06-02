export enum Environment {
  Dev = "dev",
  Prod = "prod",
}

export type ClientOptions = {
  retry: number,
  timeout: number
}

export const baseUrls: Record<Environment, string> = {
  [Environment.Dev]: "https://agg-dev.layerg.xyz/api",
  [Environment.Prod]: "https://agg-dev.layerg.xyz/api",
};

