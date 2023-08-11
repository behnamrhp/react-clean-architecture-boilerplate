import { singleton } from "tsyringe";
import Endpoint from "../endpoint";

@singleton()
export default class UsersEndpoint extends Endpoint {
  /* ------------------------------ Dependencies ------------------------------ */
  private usersEndpoint: string;

  /* --------------------------------- Getters -------------------------------- */
  get usersList(): string {
    return this.buildEndpoint(this.usersEndpoint);
  }

  /* ------------------------------- Constructor ------------------------------ */
  constructor({
    baseUrl,
    apiVersion,
    endpoint,
  }: {
    baseUrl: string;
    apiVersion: string;
    endpoint: string;
  }) {
    super({
      apiVersion,
      baseURL: baseUrl,
    });

    this.usersEndpoint = endpoint;
  }
  /* -------------------------------------------------------------------------- */
}
