import { Environment } from "./types";

export const baseUrls: Record<Environment, string> = {
  [Environment.Dev]: "https://agg-dev.layerg.xyz/api",
  [Environment.Prod]: "https://agg-dev.layerg.xyz/api",
};

