export class LayerGError extends Error {
  public readonly cause?: any;

  constructor(message: string, cause?: any) {
    super(message);
    this.name = "LayerGError";
    if (cause) {
      this.cause = cause;
    }
  }
}
