import "reflect-metadata";
import { DependencyContainer, container } from "tsyringe";
import initModulesDI from "./init-modules-di";
import initStoresDI from "./init-stores-di";
import initEndpointsDI from "./init-endpoints-di";

const InitDI = (): DependencyContainer => {
  const di = container;

  initEndpointsDI(di);
  initModulesDI(di);
  initStoresDI(di);
  return di;
};

const di = InitDI();

export default di;
