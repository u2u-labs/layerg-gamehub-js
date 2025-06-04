import axios, { AxiosError } from "axios";
import { LayerGError } from "./error";

export function shouldRetry(err: any): boolean {
  if (!axios.isAxiosError(err)) {
    return false;
  }

  const axiosErr = err as AxiosError;

  if (!axiosErr.response) {
    return true;
  }

  const status = axiosErr.response.status;

  if (status >= 500 && status < 600) {
    return true;
  }

  return false;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 1,
  onRetry?: (attempt: number, error: any) => void
): Promise<T> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;

      if (!shouldRetry(err)) {
        throw err;
      }

      if (attempt >= maxRetries) {
        throw new Error(`Request failed after ${maxRetries} retries: ${err}`);
      }

      if (onRetry) {
        onRetry(attempt, err);
      }
    }
  }

  throw new Error("Unreachable");
}

export function normalizeError(
  err: any,
  contextMessage = "Unknown SDK error"
): LayerGError {
  if (err instanceof LayerGError) return err;

  if (err && typeof err === "object") {
    if ((err as AxiosError).isAxiosError) {
      return new LayerGError(contextMessage, {
        code: "HTTP_ERROR",
        statusCode: err.response?.status,
        cause: err.response?.data?.message ?? String(err),
      });
    }
    return new LayerGError(contextMessage, {
      cause: err.response?.data?.message ?? String(err),
    });
  }
  return new LayerGError(contextMessage, {
    cause: err.response?.data?.message ?? String(err),
  });
}
