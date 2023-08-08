import appConfigs from "../config/app-configs";
import UsersEndpoint from "./endpoints/users-endpoint";

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
