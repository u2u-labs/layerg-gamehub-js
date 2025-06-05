import axios, { AxiosInstance } from "axios";
import { baseUrls } from "./config";
import { ClientOptions, AuthResponse, Environment, Result } from "./types";
import { AssetModule } from "./modules/asset";
import { CollectionModule } from "./modules/collection";
import { normalizeError } from "./utils";

export class LayerGGamehubClient {
  private apiKey: string;
  private apiKeyId: string;
  private accessToken = "";
  private refreshToken = "";
  private accessTokenExpire = 0;
  private refreshTokenExpire = 0;
  private axios: AxiosInstance;
  private clientOptions: ClientOptions;

  public asset: AssetModule;
  public collection: CollectionModule;

  /**
   * @description Create a new LayerGGamehubClient instance with the given api key and api key id.
   * @param params {
   *  apiKey: string;
   *  apiKeyId: string;
   *  env: Environment;
   *  clientOptions: ClientOptions;
   */
  constructor(params: {
    apiKey: string;
    apiKeyId: string;
    env: Environment;
    clientOptions: ClientOptions;
  }) {
    const {
      apiKey,
      apiKeyId,
      env,
      clientOptions = { retry: 1, timeout: 10000 },
    } = params;

    this.#validateApiKeys(apiKey, apiKeyId);
    this.apiKey = apiKey;
    this.apiKeyId = apiKeyId;
    this.clientOptions = clientOptions;

    this.axios = axios.create({
      baseURL: baseUrls[env],
      timeout: clientOptions.timeout,
    });

    this.asset = new AssetModule(this);
    this.collection = new CollectionModule(this);
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
  
  /**
   * @description Authenticate with the LayerGGamehub API using the provided API key and API key ID in the constructor. Needs to be called before making any requests.
   * @returns `Result<AuthResponse>`
   */
  public async authenticate(): Promise<Result<AuthResponse>> {
    try {
      const res = await this.axios.post<AuthResponse>("/auth/login", {
        apiKey: this.apiKey,
        apiKeyID: this.apiKeyId,
      });
      this.#setTokenInfo(res.data);
      return {
        data: res.data,
        isSuccess: true,
      };
    } catch (err: any) {
      this.#setTokenInfo(null);
      return {
        isSuccess: false,
        error: normalizeError(err),
      };
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
      await this.authenticate();
    } else if (now >= this.accessTokenExpire) {
      await this.#refreshAccessToken();
    }
  }

  #isAuthenticated(): boolean {
    return !!this.refreshToken && Date.now() < this.refreshTokenExpire;
  }

  #getAxios() {
    return this.axios;
  }

  #getClientOptions() {
    return this.clientOptions;
  }

  /** @internal - Do not use outside the SDK */
  readonly internal: {
    refreshAuthIfNeeded: () => Promise<void>;
    getAuthHeader: () => { Authorization: string };
    isAuthenticated: () => boolean;
    getAxios: () => AxiosInstance;
    getClientOptions: () => ClientOptions;
  } = {
    refreshAuthIfNeeded: () => this.#refreshAuthIfNeeded(),
    getAuthHeader: () => this.#getAuthHeader(),
    isAuthenticated: () => this.#isAuthenticated(),
    getAxios: () => this.#getAxios(),
    getClientOptions: () => this.#getClientOptions(),
  };
}
