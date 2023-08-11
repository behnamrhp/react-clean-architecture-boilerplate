import "reflect-metadata";
import { DependencyContainer, container } from "tsyringe";
import initModulesDI from "./init-modules-di";
import initStoresDI from "./init-stores-di";
import initEndpointsDI from "./init-endpoints-di";

/**
 * Serves as a central point for initializing and configuring
 *  the DI container, ensuring that all necessary dependencies
 *  are registered and available for injection throughout the application.
 */
const InitDI = (): DependencyContainer => {
  const di = container;

  initEndpointsDI(di);
  initModulesDI(di);
  initStoresDI(di);
  return di;
};

const di = InitDI();

export default di;
