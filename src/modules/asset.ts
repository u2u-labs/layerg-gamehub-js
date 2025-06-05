import { BaseModule } from "./base";
import { Asset, CreateAssetInput, Result, UpdateAssetInput } from "../types";

export class AssetModule extends BaseModule {
  /**
   * @description Get an asset by id and collection id
   * @param assetId: string
   * @param collectionId: string
   * @returns `Result<Asset>`
   */
  async get(assetId: string, collectionId: string): Promise<Result<Asset>> {
    return this.handleRequest<Asset>(
      "get",
      `/assets/${collectionId}/${assetId}`
    );
  }

  /**
   * @description Create a new asset
   * @param createAssetInput: CreateAssetInput
   * @returns `Result<Asset>`
   */
  async create(createAssetInput: CreateAssetInput): Promise<Result<Asset>> {
    return this.handleRequest<Asset>(
      "post",
      "/assets/create",
      createAssetInput
    );
  }

  /**
   * @description Update an asset
   * @param updateAssetInput: UpdateAssetInput
   * @param collectionId: string
   * @param assetId: string
   * @returns `Result<Asset>`
   */
  async udpdate(
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
