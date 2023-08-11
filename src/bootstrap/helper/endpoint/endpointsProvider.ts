import appConfigs from "../../config/app-configs";
import UsersEndpoint from "./endpoints/users-endpoint";

/**
 * Provides static methods to retrieve different types of endpoints.
 */
export default class EndpointsProvider {
  /* ---------------------------------- Users --------------------------------- */
  static users() {
    return new UsersEndpoint({
      baseUrl: appConfigs.baseApis.main,
      apiVersion: "",
      endpoint: "",
    });
  }
  /* -------------------------------------------------------------------------- */
}
