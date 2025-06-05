import { BaseModule } from "./base";
import {
  Collection,
  CreateCollectionInput,
  Result,
  UpdateCollectionInput,
} from "../types";

export class CollectionModule extends BaseModule {
  /**
   * @description Get a collection by id
   * @param collectionId: string
   * @returns `Result<Collection>`
   */
  async getById(collectionId: string): Promise<Result<Collection>> {
    return this.handleRequest<Collection>("get", `/collection/${collectionId}`);
  }

  /**
   * @description Create a new collection
   * @param createCollectionInput: CreateCollectionInput
   * @returns `Result<Collection>`
   */
  async create(
    createCollectionInput: CreateCollectionInput
  ): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "post",
      "/collection",
      createCollectionInput
    );
  }

  /**
   * @description Update a collection
   * @param updateCollectionInput: UpdateCollectionInput
   * @returns `Result<Collection>`
   */
  async update(
    updateCollectionInput: UpdateCollectionInput
  ): Promise<Result<Collection>> {
    const {
      data,
      where: { collectionId },
    } = updateCollectionInput;

    return this.handleRequest<Collection>(
      "put",
      `/collection/${collectionId}`,
      data
    );
  }

  /**
   * @description Public a collection to the marketplace
   * @param collectionId: string
   * @returns `Result<Collection>`
   */
  async public(collectionId: string): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "post",
      `/collection/public/${collectionId}`
    );
  }
}
