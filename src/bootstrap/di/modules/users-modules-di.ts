import { type DependencyContainer } from "tsyringe";
import UsersRepository from "~/features/core/users/data/repository/users-repository";
import { IGetUsersRepoKey } from "~/features/core/users/domain/i-repository/i-users-repo";
import { IUsersDataSourceKey } from "~/features/core/users/data/datasource/i-users-datasource";
import UsersDatasource from "~/features/core/users/data/datasource/users-datasource";
import UsersEndpoint from "~/bootstrap/endpoint/endpoints/users-endpoint";
import HTTPHandler from "../../boundary/http-boundary/http-handler";
import IModulesDI from "./i-modules-di";
/**
 * It is responsible for initializing the repositories and
 *  data sources related to the users module.
 * The class has a private property called "di" which is a DependencyContainer.
 * The constructor takes a DependencyContainer as a
 *  parameter and assigns it to the "di" property.
 */
export default class UsersModulesDI implements IModulesDI {
  /* ------------------------------ Dependencies ------------------------------ */
  private di: DependencyContainer;

  /* -------------------------------------------------------------------------- */
  constructor(di: DependencyContainer) {
    this.di = di;
  }

  /* -------------------------------------------------------------------------- */
  /**
   * This method registers the UsersRepository as a singleton in the
   *  DependencyContainer using the IGetUsersRepoKey.
   */
  initRepositories(): void {
    this.di.registerSingleton(IGetUsersRepoKey, UsersRepository);
  }

  /* -------------------------------------------------------------------------- */
  /**
   * This method resolves the HTTPHandler and UsersEndpoint dependencies from
   *  the DependencyContainer and registers a new instance of UsersDatasource
   *  with these dependencies.
   */
  initDatasources(): void {
    const httpHandler = this.di.resolve(HTTPHandler);
    const usersEndpoints = this.di.resolve(UsersEndpoint);
    this.di.registerInstance<UsersDatasource>(
      IUsersDataSourceKey,
      new UsersDatasource(httpHandler, usersEndpoints),
    );
  }

  /* -------------------------------------------------------------------------- */
  /**
   * This method is called to initialize the repositories and data sources by
   *  calling the initRepositories() and initDatasources() methods.
   */
  init() {
    this.initRepositories();
    this.initDatasources();
  }

  /* -------------------------------------------------------------------------- */
  /**
   * Factory method to create an instance of UsersModulesDI.
   */
  static produce(di: DependencyContainer) {
    new UsersModulesDI(di).init();
  }
  /* -------------------------------------------------------------------------- */
}
