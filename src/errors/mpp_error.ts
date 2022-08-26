export class MPPError extends Error {
  error: string;

  description: string;

  constructor(error: string, description: string) {
    super(error);
    this.error = error;
    this.description = description;
  }
}
