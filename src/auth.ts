import { AxiosInstance } from 'axios';
import { AuthResponse } from './types';

export class Auth {
    private apiKey: string;
    private apiKeyId: string;
    private axios: AxiosInstance;

    constructor(apiKey: string, apiKeyId: string, axios: AxiosInstance) {
        this.apiKey = apiKey;
        this.apiKeyId = apiKeyId;
        this.axios = axios;
    }

    async authenticate(): Promise<AuthResponse> {
        const res = await this.axios.post<AuthResponse>('/auth/login', {
            apiKey: this.apiKey,
            apiKeyId: this.apiKeyId,
        });
        return res.data;
    }

    async refresh(refreshToken: string): Promise<AuthResponse> {
        const res = await this.axios.post<AuthResponse>('/auth/refresh', {
            refreshToken,
        });
        return res.data;
    }
}
