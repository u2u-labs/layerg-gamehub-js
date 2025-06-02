import axios, { AxiosInstance } from "axios";
import { CreateAssetInput, UpdateAssetInput, Asset } from "./types";
import { withRetry } from "./utils";
import { ClientOptions } from "./types";

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

  async createAsset(createAssetInput: CreateAssetInput): Promise<boolean> {
    await this.ensureAccessToken();

    return withRetry(
      async () => {
        try {
          await this.axios.post(`/assets/create`, {
            headers: this.authHeader(),
            data: createAssetInput,
          });
          return true;
        } catch (err) {
          return false;
        }
      },
      this.clientOptions.retry,
      (attempt, err) => {
        console.warn(
          `createAsset attempt ${attempt} failed (network), retrying...`
        );
      }
    );
  }

  async updateAsset(
    updateAssetInput: UpdateAssetInput,
    collectionId: string,
    assetId: string
  ): Promise<boolean> {
    await this.ensureAccessToken();

    return withRetry(
      async () => {
        try {
          await this.axios.put(`/assets/${collectionId}/${assetId}`, {
            headers: this.authHeader(),
            data: updateAssetInput,
          });
          return true;
        } catch (err) {
          return false;
        }
      },
      this.clientOptions.retry,
      (attempt, err) => {
        console.warn(
          `updateAsset attempt ${attempt} failed (network), retrying...`
        );
      }
    );
  }
}
