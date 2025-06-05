import { Environment } from "./types";

export const baseUrls: Record<Environment, string> = {
  [Environment.Development]: "https://agg-dev.layerg.xyz/api",
  [Environment.Production]: "https://agg-dev.layerg.xyz/api",
};

