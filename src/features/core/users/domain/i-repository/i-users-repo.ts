import { TaskEither } from "fp-ts/lib/TaskEither";
import Users from "../entity/users";
import GetUsersFailure from "../failure/get-users-failure";

export default interface IUsersRepo {
  getUsers(): TaskEither<GetUsersFailure, Users[]>;
}

export const IGetUsersRepoKey = "IGetUsersRepoKey";