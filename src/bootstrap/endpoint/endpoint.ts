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
    return Endpoint.sanitizeURL(uris.join("/"));
  }

  /* ----------------------------- Implementation ----------------------------- */
  buildEndpoint(endpoint: string) {
    return Endpoint.sanitizeURL(
      `${this.baseURL}/${this.apiVersion}/${endpoint}`,
    );
  }

  /* -------------------------------------------------------------------------- */
  static sanitizeURL(url: string) {
    return url.replaceAll(/(?<!:)\/\//g, "");
  }
  /* -------------------------------------------------------------------------- */
}
