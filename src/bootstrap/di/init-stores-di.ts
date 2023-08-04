import { DependencyContainer } from "tsyringe";
import usersStoreDI from "./stores/users-store-di";

const initStoresDI = (di: DependencyContainer) => {
  usersStoreDI(di);
};

export default initStoresDI;
