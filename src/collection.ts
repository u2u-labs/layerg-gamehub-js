import { LayerGGamehubClient } from "./client";
import { LayerGError } from "./error";
import { Collection, UpsertCollectionInput } from "./types";
import { withRetry } from "./utils";

export class CollectionClient {
  private client: LayerGGamehubClient;

  constructor(client: LayerGGamehubClient) {
    this.client = client;
  }

  async getCollection(collectionId: string): Promise<Collection | Error> {
    return this.handleRequest<Collection>("get", `/collection/${collectionId}`);
  }

  async createCollection(
    createCollectionInput: UpsertCollectionInput
  ): Promise<Collection | Error> {
    return this.handleRequest<Collection>(
      "post",
      "/collection",
      createCollectionInput
    );
  }

  async updateCollection(
    updateCollectionInput: UpsertCollectionInput,
    collectionId: string
  ): Promise<Collection | Error> {
    return this.handleRequest<Collection>(
      "put",
      `/collection/${collectionId}`,
      updateCollectionInput
    );
  }

  async publicCollection(collectionId: string): Promise<boolean> {
    await this.client.ensureAccessToken();

    return withRetry(
      async () => {
        try {
          await this.client
            .getAxios()
            .post(`/collection/public/${collectionId}`, null, {
              headers: this.client.getAuthHeader(),
            });
          return true;
        } catch (err: any) {
          console.error(
            `[CollectionClient] POST /collection/public/${collectionId}`,
            err.toString()
          );
          return false;
        }
      },
      this.client.getClientOptions().retry,
      (attempt, err) => {
        console.warn(
          `[CollectionClient] POST /collection/public/${collectionId} attempt ${attempt} failed`,
          err
        );
      }
    );
  }

  private async handleRequest<T>(
    method: "get" | "post" | "put",
    url: string,
    payload?: any
  ): Promise<T | Error> {
    await this.client.ensureAccessToken();

    return withRetry(
      async () => {
        try {
          const res = await this.client.getAxios().request<T>({
            method,
            url,
            data: payload,
            headers: this.client.getAuthHeader(),
          });
          return res.data;
        } catch (err: any) {
          throw new LayerGError(
            `Failed to handle ${method} request to ${url}. Error: `,
            err
          );
        }
      },
      this.client.getClientOptions().retry,
      (attempt, err) => {
        console.warn(
          `[CollectionClient] ${method.toUpperCase()} ${url} attempt ${attempt} failed`,
          err
        );
      }
    );
  }
}
