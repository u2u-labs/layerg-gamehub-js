import axios, { AxiosError } from "axios";
import { AuthError, BadRequestError, NetworkError, NotFoundError, RateLimitError, SDKError, ServerError, TimeoutError } from "./error";

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

export function normalizeError(error: any): SDKError {
  if (error.response) {
    const status = error.response.status;
    const msg = error.response.data?.message || error.message || "Unknown error";

    if (status === 400) return new BadRequestError(msg, status, error);
    if (status === 401 || status === 403) return new AuthError(msg, status, error);
    if (status === 404) return new NotFoundError(msg, status, error);
    if (status === 429) return new RateLimitError(msg, status, error);
    if (status >= 500) return new ServerError(msg, status, error);

    return new SDKError(msg, status, error);
  }

  if (error.code === "ECONNABORTED") return new TimeoutError("Request timed out", undefined, error);
  if (error.message?.includes("Network Error")) return new NetworkError("Network error", undefined, error);

  return new SDKError(error.message || "Unknown SDK error", undefined, error);
};
