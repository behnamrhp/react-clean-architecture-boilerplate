import { inject, singleton } from "tsyringe";
import { TaskEither } from "fp-ts/lib/TaskEither";
import type IUsersRepo from "../i-repository/i-users-repo";
import { IGetUsersRepoKey } from "../i-repository/i-users-repo";
import GetUsersFailure from "../failure/get-users-failure";
import Users from "../entity/users";

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
