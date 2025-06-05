import { BaseModule } from "./base";
import {
  Asset,
  CreateAssetInput,
  GetByTokenIdInput,
  Result,
  UpdateAssetInput,
} from "../types";

export class AssetModule extends BaseModule {
  /**
   * @description Get an asset by token id and collection id
   * @param input: GetByTokenIdInput
   * @returns `Result<Asset>`
   */
  async getByTokenId(input: GetByTokenIdInput): Promise<Result<Asset>> {
    return this.handleRequest<Asset>(
      "get",
      `/assets/${input.collectionId}/${input.tokenId}`
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
   * @returns `Result<Asset>`
   */
  async update(updateAssetInput: UpdateAssetInput): Promise<Result<Asset>> {
    const { data, where } = updateAssetInput;
    const { collectionId, assetId } = where;

    return this.handleRequest<Asset>(
      "put",
      `/assets/${collectionId}/${assetId}`,
      data
    );
  }
}
