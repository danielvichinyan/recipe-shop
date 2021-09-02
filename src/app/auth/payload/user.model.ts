export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    // Check if token is expired
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
