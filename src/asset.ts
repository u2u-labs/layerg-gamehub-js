import { LayerGGamehubClient } from "./client";
import { Asset, CreateAssetInput, UpdateAssetInput } from "./types";
import { withRetry } from "./utils";

export class AssetClient {
  private client: LayerGGamehubClient;

  constructor(client: LayerGGamehubClient) {
    this.client = client;
  }

  async getAsset(assetId: string, collectionId: string): Promise<Asset | Error> {
    return this.handleRequest<Asset>("get", `/assets/${collectionId}/${assetId}`);
  }

  async createAsset(createAssetInput: CreateAssetInput): Promise<Asset | Error> {
    return this.handleRequest<Asset>("post", "/assets/create", createAssetInput);
  }

  async updateAsset(
    updateAssetInput: UpdateAssetInput,
    collectionId: string,
    assetId: string
  ): Promise<Asset | Error> {
    return this.handleRequest<Asset>(
      "put",
      `/assets/${collectionId}/${assetId}`,
      updateAssetInput
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
          return new Error(err.toString());
        }
      },
      this.client.getClientOptions().retry,
      (attempt, err) => {
        console.warn(`[AssetClient] ${method.toUpperCase()} ${url} attempt ${attempt} failed`, err);
      }
    );
  }
}
