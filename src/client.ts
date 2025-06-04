import axios, { AxiosInstance } from "axios";
import { baseUrls } from "./config";
import { ClientOptions, AuthResponse, Environment } from "./types";
import { AssetsModule } from "./modules/assets.module";
import { CollectionsModule } from "./modules/collections.module";

export class LayerGGamehubClient {
  private apiKey: string;
  private apiKeyId: string;
  private accessToken = "";
  private refreshToken = "";
  private accessTokenExpire = 0;
  private refreshTokenExpire = 0;
  private axios: AxiosInstance;
  private clientOptions: ClientOptions;

  public assets: AssetsModule;
  public collections: CollectionsModule;

  constructor(
    apiKey: string,
    apiKeyId: string,
    env: Environment,
    clientOptions: ClientOptions = { retry: 1, timeout: 10000 }
  ) {
    this.#validateApiKeys(apiKey, apiKeyId);
    this.apiKey = apiKey;
    this.apiKeyId = apiKeyId;
    this.clientOptions = clientOptions;

    this.axios = axios.create({
      baseURL: baseUrls[env],
      timeout: clientOptions.timeout,
    });

    this.assets = new AssetsModule(this);
    this.collections = new CollectionsModule(this);

    this.#authenticate();
  }

  #validateApiKeys(apiKey: string, apiKeyId: string): void {
    if (!apiKey.trim()) throw new Error("API key is required.");
    if (!apiKeyId.trim()) throw new Error("API key ID is required.");
  }

  #setTokenInfo(authResp: AuthResponse | null): void {
    if (authResp) {
      this.accessToken = authResp.accessToken;
      this.refreshToken = authResp.refreshToken;
      this.accessTokenExpire = authResp.accessTokenExpire;
      this.refreshTokenExpire = authResp.refreshTokenExpire;
    } else {
      this.accessToken = this.refreshToken = "";
      this.accessTokenExpire = this.refreshTokenExpire = 0;
    }
  }

  #getAuthHeader() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async #authenticate(): Promise<void> {
    try {
      const res = await this.axios.post<AuthResponse>("/auth/login", {
        apiKey: this.apiKey,
        apiKeyId: this.apiKeyId,
      });
      this.#setTokenInfo(res.data);
    } catch {
      this.#setTokenInfo(null);
      throw new Error("Authentication failed.");
    }
  }

  async #refreshAccessToken(): Promise<void> {
    try {
      const res = await this.axios.post<AuthResponse>("/auth/refresh", {
        refreshToken: this.refreshToken,
      });
      this.#setTokenInfo(res.data);
    } catch {
      this.#setTokenInfo(null);
      throw new Error("Token refresh failed.");
    }
  }

  async #refreshAuthIfNeeded(): Promise<void> {
    const now = Date.now();
    if (now >= this.refreshTokenExpire) {
      await this.#authenticate();
    } else if (now >= this.accessTokenExpire) {
      await this.#refreshAccessToken();
    }
  }

  /** @internal - Do not use outside the SDK */
  readonly internal: {
    refreshAuthIfNeeded: () => Promise<void>;
    getAuthHeader: () => { Authorization: string };
  } = {
    refreshAuthIfNeeded: () => this.#refreshAuthIfNeeded(),
    getAuthHeader: () => this.#getAuthHeader(),
  };

  getAxios() {
    return this.axios;
  }

  getClientOptions() {
    return this.clientOptions;
  }
}
