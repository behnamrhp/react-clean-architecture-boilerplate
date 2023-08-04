import { inject, injectable, singleton } from "tsyringe";
import type IUsersRepo from "../i-repository/i-users-repo";
import { IGetUsersRepoKey } from "../i-repository/i-users-repo";
import GetUsersFailure from "../failure/get-users-failure";
import Users from "../entity/users";
import { TaskEither } from "fp-ts/lib/TaskEither";

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