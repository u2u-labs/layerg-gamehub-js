import axios, { AxiosInstance } from "axios";
import { CreateAssetInput, Asset } from "./types";
import { withRetry } from "./utils";
import { ClientOptions } from "./config";

export class Assets {
  private axios: AxiosInstance;
  private clientOptions: ClientOptions;
  private getAccessToken: () => string;
  private ensureAccessToken: () => Promise<void>;

  constructor(
    client: {
      axios: AxiosInstance;
      clientOptions: ClientOptions;
    },
    getAccessToken: () => string,
    ensureAccessToken: () => Promise<void>
  ) {
    this.axios = client.axios;
    this.clientOptions = client.clientOptions;
    this.getAccessToken = getAccessToken;
    this.ensureAccessToken = ensureAccessToken;
  }

  private authHeader() {
    return { Authorization: `Bearer ${this.getAccessToken()}` };
  }

  async getAsset(assetId: string, collectionId: string): Promise<Asset> {
    await this.ensureAccessToken();

    return withRetry(
      async () => {
        const res = await this.axios.get<Asset>(
          `/assets/${collectionId}/${assetId}`,
          { headers: this.authHeader() }
        );
        return res.data;
      },
      this.clientOptions.retry,
      (attempt, err) => {
        console.warn(
          `getAsset attempt ${attempt} failed (network), retrying...`
        );
      }
    );
  }
}
