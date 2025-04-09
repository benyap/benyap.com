export class ObjectURLImagePreview {
  private revoked = false;

  constructor(
    readonly url: string,
    readonly filename: string,
  ) {}

  revoke() {
    URL.revokeObjectURL(this.url);
    this.revoked = true;
    console.debug("Revoked preview preview for", this.filename);
  }

  isRevoked() {
    return this.revoked;
  }
}
