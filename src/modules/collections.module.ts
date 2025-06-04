import { BaseModule } from "./base.module";
import { Collection, Result, UpsertCollectionInput } from "../types";
import { normalizeError, withRetry } from "../utils";
import { LayerGError } from "../error";

export class CollectionsModule extends BaseModule {
  async getCollection(collectionId: string): Promise<Result<Collection>> {
    return this.handleRequest<Collection>("get", `/collection/${collectionId}`);
  }

  async createCollection(
    createCollectionInput: UpsertCollectionInput
  ): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "post",
      "/collection",
      createCollectionInput
    );
  }

  async updateCollection(
    updateCollectionInput: UpsertCollectionInput,
    collectionId: string
  ): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "put",
      `/collection/${collectionId}`,
      updateCollectionInput
    );
  }

  async publicCollection(collectionId: string): Promise<Result<Collection>> {
    return this.handleRequest<Collection>(
      "post",
      `/collection/public/${collectionId}`
    );
  }
}
