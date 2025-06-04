import { BaseModule } from "./base.module";
import { Asset, CreateAssetInput, UpdateAssetInput } from "../types";

export class AssetsModule extends BaseModule {
  async getAsset(
    assetId: string,
    collectionId: string
  ): Promise<Asset | Error> {
    return this.handleRequest<Asset>(
      "get",
      `/assets/${collectionId}/${assetId}`
    );
  }

  async createAsset(
    createAssetInput: CreateAssetInput
  ): Promise<Asset | Error> {
    return this.handleRequest<Asset>(
      "post",
      "/assets/create",
      createAssetInput
    );
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
}
