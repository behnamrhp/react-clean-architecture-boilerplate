import { DependencyContainer } from "tsyringe";
import UsersEndpoint from "~/bootstrap/helper/endpoint/endpoints/users-endpoint";
import EndpointsProvider from "~/bootstrap/helper/endpoint/endpointsProvider";

/**
 * This function is used to initialize the dependency injection (DI) endpoints.
 * It takes a dependency container (di) as a parameter.
 */
const initEndpointsDI = (di: DependencyContainer) => {
  /* ---------------------------------- Users --------------------------------- */
  di.registerInstance<UsersEndpoint>(UsersEndpoint, EndpointsProvider.users());
  /* -------------------------------------------------------------------------- */
};

export default initEndpointsDI;
