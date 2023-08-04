import { DependencyContainer } from "tsyringe";
import UsersModulesDI from "./modules/users-modules-di";

export default function initModulesDI(di: DependencyContainer) {
  UsersModulesDI.produce(di);
}