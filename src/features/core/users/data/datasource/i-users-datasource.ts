import { TaskEither } from "fp-ts/lib/TaskEither";
import UsersFailuer from "../../domain/failure/user-failure";
import { GetUsersInfoDTO } from "../dto/get-users-dto";

export default interface IUsersDataSource {
  getUsers(): TaskEither<UsersFailuer, GetUsersInfoDTO[]>
}

export const IUsersDataSourceKey = "IUsersDataSource";