import { BaseModule } from "./base.module";
import { Asset, CreateAssetInput, Result, UpdateAssetInput } from "../types";

export class AssetsModule extends BaseModule {
  async getAsset(
    assetId: string,
    collectionId: string
  ): Promise<Result<Asset>> {
    return this.handleRequest<Asset>(
      "get",
      `/assets/${collectionId}/${assetId}`
    );
  }

  async createAsset(
    createAssetInput: CreateAssetInput
  ): Promise<Result<Asset>> {
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
  ): Promise<Result<Asset>> {
    return this.handleRequest<Asset>(
      "put",
      `/assets/${collectionId}/${assetId}`,
      updateAssetInput
    );
  }
}
