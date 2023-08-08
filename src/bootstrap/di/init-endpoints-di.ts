import { DependencyContainer } from "tsyringe";
import UsersEndpoint from "~/bootstrap/endpoint/endpoints/users-endpoint";
import EndpointsProvider from "~/bootstrap/endpoint/endpointsProvider";

const initEndpointsDI = (di: DependencyContainer) => {
  /* ---------------------------------- Users --------------------------------- */
  di.registerInstance<UsersEndpoint>(UsersEndpoint, EndpointsProvider.users());
  /* -------------------------------------------------------------------------- */
};

export default initEndpointsDI;
