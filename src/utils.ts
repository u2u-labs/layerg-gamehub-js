import axios, { AxiosError } from "axios";

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
