import { Mode } from "./types";

export const baseUrls: Record<Mode, string> = {
  [Mode.Sandbox]: "https://agg-dev.layerg.xyz/api",
  [Mode.Production]: "https://agg-dev.layerg.xyz/api",
};

