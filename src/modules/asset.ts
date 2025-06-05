import { BaseModule } from "./base";
import {
  Asset,
  CreateAssetInput,
  DeleteAssetInput,
  DeleteAssetSuccessResponse,
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
   * @param input: CreateAssetInput
   * @returns `Result<Asset>`
   */
  async create(input: CreateAssetInput): Promise<Result<Asset>> {
    return this.handleRequest<Asset>("post", "/assets/create", input);
  }

  /**
   * @description Update an asset
   * @param input: UpdateAssetInput
   * @returns `Result<Asset>`
   */
  async update(input: UpdateAssetInput): Promise<Result<Asset>> {
    const { data, where } = input;
    const { collectionId, assetId } = where;

    return this.handleRequest<Asset>(
      "put",
      `/assets/${collectionId}/${assetId}`,
      data
    );
  }

  /**
   * @description Delete an asset
   * @param input: DeleteAssetInput
   * @returns `Result<DeleteAssetSuccessResponse>`
   */
  async delete(
    input: DeleteAssetInput
  ): Promise<Result<DeleteAssetSuccessResponse>> {
    const { collectionId, tokenId } = input;

    return this.handleRequest<DeleteAssetSuccessResponse>(
      "delete",
      `/assets/${collectionId}/${tokenId}`
    );
  }
}
