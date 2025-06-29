import { normalizeError, withRetry } from "../utils";
import { SDKError } from "../error";
import { LayerGGamehubClient } from "../client";
import { Result } from "../types";

export abstract class BaseModule {
  protected client: LayerGGamehubClient;

  constructor(client: LayerGGamehubClient) {
    this.client = client;
  }

  protected async handleRequest<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    payload?: any,
    label = url
  ): Promise<Result<T>> {
    if (!this.client.internal.isAuthenticated()) {
      throw new SDKError(
        "Client not authenticated. You need to call authenticate before making any request",
        401
      );
    }

    await this.client.internal.refreshAuthIfNeeded();

    return withRetry(
      async () => {
        try {
          const res = await this.client.internal.getAxios().request<T>({
            method,
            url,
            data: payload,
            headers: this.client.internal.getAuthHeader(),
          });
          return {
            data: res.data,
            isSuccess: true,
          };
        } catch (err: any) {
          return {
            error: normalizeError(err),
            isSuccess: false,
          };
        }
      },
      this.client.internal.getClientOptions().retry,
      (attempt, err) => {
        console.warn(
          `[${this.constructor.name}] ${label} attempt ${attempt} failed`,
          err
        );
      }
    );
  }
}
