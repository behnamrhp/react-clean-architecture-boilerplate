import 'reflect-metadata';
import { DependencyContainer, container } from "tsyringe";
import initModulesDI from "./init-modules-di";
import initStoresDI from './init-stores-di';

const InitDI = (): DependencyContainer => {
  const di = container;

  initModulesDI(di);
  initStoresDI(di);
  return di;
}

const di = InitDI();

export default di;