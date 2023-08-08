export default class Endpoint {
  /* ------------------------------ Dependencies ------------------------------ */
  baseURL: string;

  /* -------------------------------------------------------------------------- */
  apiVersion: string;

  /* ------------------------------- Constructor ------------------------------ */
  constructor({
    baseURL,
    apiVersion,
  }: {
    baseURL: string;
    apiVersion: string;
  }) {
    this.apiVersion = apiVersion;
    this.baseURL = baseURL;
  }

  /* --------------------------------- Static --------------------------------- */
  static compose(uris: string[]) {
    return uris.join("/").replaceAll(/(?<!:)\/\//, "/");
  }

  /* ----------------------------- Implementation ----------------------------- */
  buildEndpoint(endpoint: string) {
    return `${this.baseURL}/${endpoint}`;
  }

  /* -------------------------------------------------------------------------- */
  buildVersionsEndpoint(endpoint: string) {
    return this.buildEndpoint(`${this.apiVersion}/${endpoint}`);
  }
  /* -------------------------------------------------------------------------- */
}
