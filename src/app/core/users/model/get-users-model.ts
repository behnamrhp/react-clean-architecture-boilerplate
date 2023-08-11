import { inject, singleton } from "tsyringe";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import Users from "~/features/core/users/domain/entity/users";
import type Store from "~/bootstrap/helper/store/store-type";
import usersStore from "../store/users-store";
import type NUsersStore from "../store/i-users-store";

@singleton()
export default class GetUsersModel {
  /* ------------------------------ Dependencies ------------------------------ */
  public usersStore: Store<NUsersStore.IUsersStore>;

  /* -------------------------------------------------------------------------- */
  private getUsersUsecase: GetUsersUsecase;

  /* -------------------------------------------------------------------------- */
  get users(): Users[] {
    return this.usersStore.getState().users;
  }

  /* -------------------------------------------------------------------------- */
  constructor(
    @inject(`${usersStore}`) usersStore: Store<NUsersStore.IUsersStore>,
    @inject(GetUsersUsecase) getUsersUsecase: GetUsersUsecase,
  ) {
    this.usersStore = usersStore;
    this.getUsersUsecase = getUsersUsecase;
  }

  /* -------------------------------------------------------------------------- */
  async initUsers() {
    const executer = pipe(
      this.getUsersUsecase.execute(),
      TE.chain((users) => TE.right(this.usersStore.getState().addUsers(users))),
    );

    await executer();
  }

  /* -------------------------------------------------------------------------- */
}
