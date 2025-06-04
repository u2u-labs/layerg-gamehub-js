import { BaseModule } from "./base.module";
import { Collection, UpsertCollectionInput } from "../types";
import { withRetry } from "../utils";
import { LayerGError } from "../error";

export class CollectionsModule extends BaseModule {
  async getCollection(collectionId: string): Promise<Collection | Error> {
    return this.handleRequest<Collection>("get", `/collection/${collectionId}`);
  }

  async createCollection(
    createCollectionInput: UpsertCollectionInput
  ): Promise<Collection> {
    return this.handleRequest<Collection>(
      "post",
      "/collection",
      createCollectionInput
    );
  }

  async updateCollection(
    updateCollectionInput: UpsertCollectionInput,
    collectionId: string
  ): Promise<Collection> {
    return this.handleRequest<Collection>(
      "put",
      `/collection/${collectionId}`,
      updateCollectionInput
    );
  }

  async publicCollection(collectionId: string): Promise<boolean> {
    if (!this.client.internal.isAuthenticated()) {
      throw new LayerGError(
        "Client not authenticated. You need to be authenticated first in order to make this request"
      );
    }

    await this.client.internal.refreshAuthIfNeeded();

    return withRetry(
      async () => {
        try {
          await this.client.internal
            .getAxios()
            .post(`/collection/public/${collectionId}`, null, {
              headers: this.client.internal.getAuthHeader(),
            });
          return true;
        } catch (err: any) {
          console.error(
            `[CollectionClient] POST /collection/public/${collectionId}`,
            err.toString()
          );
          return false;
        }
      },
      this.client.internal.getClientOptions().retry,
      (attempt, err) => {
        console.warn(
          `[CollectionClient] POST /collection/public/${collectionId} attempt ${attempt} failed`,
          err
        );
      }
    );
  }
}
