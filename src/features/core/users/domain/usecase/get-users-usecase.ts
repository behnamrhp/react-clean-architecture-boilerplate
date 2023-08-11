import { inject, injectable, singleton } from "tsyringe";
import { TaskEither } from "fp-ts/lib/TaskEither";
import type IUsersRepo from "../i-repository/i-users-repo";
import { IGetUsersRepoKey } from "../i-repository/i-users-repo";
import GetUsersFailure from "../failure/get-users-failure";
import Users from "../entity/users";

/**
 * This is a TypeScript class called  GetUsersUsecase
 *  which is responsible for getting a list of users.
 * The class is annotated with  @singleton()  which indicates
 *  that it should be instantiated as a singleton, meaning only
 *  one instance of this class will be created and shared across the application.
 *
 * The class has a private property called  repository  of type
 *  IUsersRepo , which is the repository interface for accessing user data.
 */
@singleton()
export default class GetUsersUsecase {
  private repository: IUsersRepo;

  constructor(@inject(`${IGetUsersRepoKey}`) repository: IUsersRepo) {
    this.repository = repository;
  }

  execute(): TaskEither<GetUsersFailure, Users[]> {
    return this.repository.getUsers();
  }
}
