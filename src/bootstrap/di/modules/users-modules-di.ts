import { type DependencyContainer } from "tsyringe";
import UsersRepository from "~/features/core/users/data/repository/users-repository";
import { IGetUsersRepoKey } from "~/features/core/users/domain/i-repository/i-users-repo";
import { IUsersDataSourceKey } from "~/features/core/users/data/datasource/i-users-datasource";
import UsersDatasource from "~/features/core/users/data/datasource/users-datasource";
import UsersEndpoint from "~/bootstrap/endpoint/endpoints/users-endpoint";
import HTTPHandler from "../../boundary/http-boundary/http-handler";
import IModulesDI from "./i-modules-di";

export default class UsersModulesDI implements IModulesDI {
  /* ------------------------------ Dependencies ------------------------------ */
  private di: DependencyContainer;

  /* -------------------------------------------------------------------------- */
  constructor(di: DependencyContainer) {
    this.di = di;
  }

  /* -------------------------------------------------------------------------- */
  initRepositories(): void {
    this.di.registerSingleton(IGetUsersRepoKey, UsersRepository);
  }

  /* -------------------------------------------------------------------------- */
  initDatasources(): void {
    const httpHandler = this.di.resolve(HTTPHandler);
    const usersEndpoints = this.di.resolve(UsersEndpoint);
    this.di.registerInstance<UsersDatasource>(
      IUsersDataSourceKey,
      new UsersDatasource(httpHandler, usersEndpoints),
    );
  }

  /* -------------------------------------------------------------------------- */
  init() {
    this.initRepositories();
    this.initDatasources();
  }

  /* -------------------------------------------------------------------------- */
  static produce(di: DependencyContainer) {
    new UsersModulesDI(di).init();
  }
  /* -------------------------------------------------------------------------- */
}
