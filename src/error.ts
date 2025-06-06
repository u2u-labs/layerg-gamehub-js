export class SDKError extends Error {
  constructor(public message: string, public status?: number, public cause?: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends SDKError {}
export class NetworkError extends SDKError {}
export class TimeoutError extends SDKError {}
export class RateLimitError extends SDKError {}
export class BadRequestError extends SDKError {}
export class NotFoundError extends SDKError {}
export class ServerError extends SDKError {}
