import { DependencyContainer } from "tsyringe";
import usersStoreDI from "./stores/users-store-di";

const initStoresDI = (di: DependencyContainer) => {
  /* ---------------------------------- Users --------------------------------- */
  usersStoreDI(di);
  /* -------------------------------------------------------------------------- */
};

export default initStoresDI;
