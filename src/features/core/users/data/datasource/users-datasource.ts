import * as TE from "fp-ts/lib/TaskEither";
import UsersFailuer from "../../domain/failure/user-failure";
import { GetUsersInfoDTO } from "../dto/get-users-dto";
import IUsersDataSource from "./i-users-datasource";
import { inject, injectable } from "tsyringe";
import { pipe } from "fp-ts/lib/function";
import GetUsersFailure from "../../domain/failure/get-users-failure";
import { HttpOptions } from "~/bootstrap/boundary/http-boundary/protocols/http-protocols";
import HTTPHandler from "~/bootstrap/boundary/http-boundary/http-handler";

@injectable<UsersDatasource>()
export default class UsersDatasource implements IUsersDataSource {
/* ------------------------------ Dependencies ------------------------------ */
  private httpHandler: HTTPHandler; 
  private endpoint: string;
/* -------------------------------------------------------------------------- */
  constructor(
    @inject(HTTPHandler) httpHandler: HTTPHandler, 
    endpoint: string,
    ) {
    this.httpHandler = httpHandler;
    this.endpoint = endpoint;
  }
/* -------------------------------------------------------------------------- */
  getUsers(): TE.TaskEither<UsersFailuer, GetUsersInfoDTO[]> {
    const options: HttpOptions = {
      url: this.endpoint,
    }

    const getData = (options: HttpOptions) => TE.tryCatch(
      () => this.httpHandler.request<{users: GetUsersInfoDTO[]}>(options),
      () => new GetUsersFailure()
    )

    const finalResponse = pipe(
      options,
      getData,
      TE.chain((response) => TE.right(this.toDTO(response))),
    )
    return finalResponse;
  }
/* -------------------------------------------------------------------------- */
  private toDTO(httpResponse: {users: GetUsersInfoDTO[]}) {
    return httpResponse.users.map((user) =>  new GetUsersInfoDTO({
        email: user.email,
        id: user.id,
        name: user.name ?? '',
      })
    );
  }
/* -------------------------------------------------------------------------- */
}