export class ObjectURLImagePreview {
  private revoked = false;

  constructor(
    readonly url: string,
    readonly filename: string,
  ) {}

  revoke() {
    URL.revokeObjectURL(this.url);
    this.revoked = true;
    console.debug("Revoked preview image for", this.filename);
  }

  isRevoked() {
    return this.revoked;
  }
}
