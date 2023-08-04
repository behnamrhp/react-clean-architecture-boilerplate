import { inject, injectable } from "tsyringe";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { taskEither } from "fp-ts";
import type IUsersRepo from "../../domain/i-repository/i-users-repo";
import type IUsersDataSource from "../datasource/i-users-datasource";
import GetUsersFailure from "../../domain/failure/get-users-failure";
import { GetUsersInfoDTO } from "../dto/get-users-dto";
import Users from "../../domain/entity/users";
import { IUsersDataSourceKey } from "../datasource/i-users-datasource";

@injectable()
export default class UsersRepository implements IUsersRepo {
  /* ------------------------------ Dependencies ------------------------------ */
  private datasource: IUsersDataSource;

  /* -------------------------------------------------------------------------- */
  constructor(@inject(`${IUsersDataSourceKey}`) datasource: IUsersDataSource) {
    this.datasource = datasource;
  }

  /* -------------------------------------------------------------------------- */
  getUsers(): TaskEither<GetUsersFailure, Users[]> {
    const response = this.datasource.getUsers();

    return pipe(
      response,
      taskEither.map((dtos) => this.toEntity(dtos)),
    );
  }

  /* -------------------------------------------------------------------------- */
  private toEntity(dtos: GetUsersInfoDTO[]): Users[] {
    return dtos.map(
      (dto) =>
        new Users({
          email: dto.email,
          id: dto.id,
          name: dto.name,
        }),
    );
  }
  /* -------------------------------------------------------------------------- */
}
