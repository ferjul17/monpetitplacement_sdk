export class TokenError extends Error {
  type: string;

  title: string;

  detail: string;

  constructor(type: string, title: string, detail: string) {
    super(type);
    this.type = type;
    this.title = title;
    this.detail = detail;
  }
}
