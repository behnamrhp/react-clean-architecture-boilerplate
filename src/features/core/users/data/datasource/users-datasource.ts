import * as TE from "fp-ts/lib/TaskEither";
import { inject, injectable } from "tsyringe";
import { pipe } from "fp-ts/lib/function";
import { HttpOptions } from "~/bootstrap/boundary/http-boundary/protocols/http-protocols";
import HTTPHandler from "~/bootstrap/boundary/http-boundary/http-handler";
import { delay } from "fp-ts/lib/Task";
import UsersEndpoint from "~/bootstrap/endpoint/endpoints/users-endpoint";
import GetUsersFailure from "../../domain/failure/get-users-failure";
import { GetUsersInfoDTO } from "../dto/get-users-dto";
import UsersFailuer from "../../domain/failure/user-failure";
import IUsersDataSource from "./i-users-datasource";

/**
 * retrieving user information. It is responsible for making HTTP requests to a
 *  specified endpoint and returning the data in a specific format.
 *
 * The class  UsersDatasource  is decorated with  @injectable  to indicate that
 *  it can be injected as a dependency in other classes.
 */
@injectable<UsersDatasource>()
export default class UsersDatasource implements IUsersDataSource {
  /* ------------------------------ Dependencies ------------------------------ */
  private httpHandler: HTTPHandler;

  private endpoint: UsersEndpoint;

  /* -------------------------------------------------------------------------- */
  constructor(
    @inject(HTTPHandler) httpHandler: HTTPHandler,
    @inject(UsersEndpoint) endpoint: UsersEndpoint,
  ) {
    this.httpHandler = httpHandler;
    this.endpoint = endpoint;
  }

  /* -------------------------------------------------------------------------- */
  getUsers(): TE.TaskEither<UsersFailuer, GetUsersInfoDTO[]> {
    const options: HttpOptions = {
      url: this.endpoint.usersList,
    };
    const getData = (options: HttpOptions) =>
      TE.tryCatch(
        () => this.httpHandler.request<{ users: GetUsersInfoDTO[] }>(options),
        () => new GetUsersFailure(),
      );

    const finalResponse = pipe(
      options,
      getData,
      delay(3000),
      TE.chain((response) => TE.right(this.toDTO(response))),
    );
    return finalResponse;
  }

  /* -------------------------------------------------------------------------- */
  private toDTO(httpResponse: { users: GetUsersInfoDTO[] }) {
    return httpResponse.users.map(
      (user) =>
        new GetUsersInfoDTO({
          email: user.email,
          id: user.id,
          name: user.name ?? "",
        }),
    );
  }
  /* -------------------------------------------------------------------------- */
}
