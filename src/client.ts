import axios, { AxiosInstance } from "axios";
import { Auth } from "./auth";
import { AuthResponse } from "./types";
import { Environment, baseUrls, ClientOptions } from "./config";
import { Assets } from "./assets";

export class LayerGGamehubClient {
  private apiKey: string;
  private apiKeyId: string;
  private accessToken: string = "";
  private refreshToken: string = "";
  private axios: AxiosInstance;
  private auth: Auth;
  private clientOptions: ClientOptions;

  // Exposed modules
  public assets: Assets;

  constructor(
    apiKey: string,
    apiKeyId: string,
    env: Environment,
    clientOptions: ClientOptions = { retry: 1, timeout: 10000 }
  ) {
    this.validateApiKeys(apiKey, apiKeyId);

    this.apiKey = apiKey;
    this.apiKeyId = apiKeyId;
    this.clientOptions = clientOptions;

    this.axios = axios.create({
      baseURL: baseUrls[env],
      timeout: this.clientOptions.timeout,
    });

    this.auth = new Auth(this.apiKey, this.apiKeyId, this.axios);
    this.assets = new Assets(
      {
        axios: this.axios,
        clientOptions: this.clientOptions,
      },
      () => this.accessToken,
      this.ensureAccessToken.bind(this)
    );

    this.authenticate();
  }

  private validateApiKeys(apiKey: string, apiKeyId: string): void {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("API key is required and cannot be empty.");
    }
    if (!apiKeyId || apiKeyId.trim() === "") {
      throw new Error("API key ID is required and cannot be empty.");
    }
  }

  private async authenticate(): Promise<void> {
    const authResp = await this.auth.authenticate();
    this.setTokens(authResp);
  }

  private async ensureAccessToken(): Promise<void> {
    const authResp = await this.auth.refresh(this.refreshToken);
    this.setTokens(authResp);
  }

  private setTokens(authResp: AuthResponse): void {
    this.accessToken = authResp.accessToken;
    this.refreshToken = authResp.refreshToken;
  }
}
