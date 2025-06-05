import { BaseModule } from "./base";
import { Collection, Result, UpsertCollectionInput } from "../types";

export class CollectionModule extends BaseModule {
  /**
   * @description Get a collection by id
   * @param collectionId: string
   * @returns `Result<Collection>`
   */
  async get(collectionId: string): Promise<Result<Collection>> {
    return this.handleRequest<Collection>("get", `/collection/${collectionId}`);
  }

  /**
   * @description Create a new collection
   * @param createCollectionInput: UpsertCollectionInput
   * @returns `Result<Collection>`
   */
  async create(
    createCollectionInput: UpsertCollectionInput
  ): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "post",
      "/collection",
      createCollectionInput
    );
  }

  /**
   * @description Update a collection
   * @param updateCollectionInput: UpsertCollectionInput
   * @param collectionId: string
   * @returns `Result<Collection>`
   */
  async update(
    updateCollectionInput: UpsertCollectionInput,
    collectionId: string
  ): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "put",
      `/collection/${collectionId}`,
      updateCollectionInput
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
