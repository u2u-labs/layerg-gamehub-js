import { withRetry } from "../utils";
import { LayerGError } from "../error";
import { LayerGGamehubClient } from "../client";

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
  ): Promise<T> {
    if (!this.client.internal.isAuthenticated()) {
      throw new LayerGError(
        "Client not authenticated. You need to call authenticate before making any request"
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
          return res.data;
        } catch (err: any) {
          throw new LayerGError(
            `Request failed: ${label}`,
            err?.response?.data?.message ?? err.message ?? err.toString()
          );
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
