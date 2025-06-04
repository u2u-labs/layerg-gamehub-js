export interface LayerGErrorOptions {
  code?: string;
  statusCode?: number;
  cause?: any;
}

export class LayerGError extends Error {
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly cause?: any;

  constructor(message: string, options: LayerGErrorOptions = {}) {
    super(message);
    this.name = "LayerGError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.cause = options.cause;
  }
}
