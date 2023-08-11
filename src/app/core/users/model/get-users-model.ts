import { inject, singleton } from "tsyringe";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import Users from "~/features/core/users/domain/entity/users";
import type Store from "~/bootstrap/helper/store/store-type";
import usersStore from "../store/users-store";
import type NUsersStore from "../store/i-users-store";

/**
 * This is the main class that is responsible for business logics in
 *  the application layer.
 * It used to get the users in the application.
 * It is responsible for calling the
 *  getUsersUsecase and adding the users to the store.
 */
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
  /**
   * This is a function that is used to initialize the users in the store.
   * It calls the getUsersUsecase and adds the users to the store.
   */
  async initUsers() {
    const executer = pipe(
      this.getUsersUsecase.execute(),
      TE.chain((users) => TE.right(this.usersStore.getState().addUsers(users))),
    );

    const result = await executer();

    return result;
  }

  /* -------------------------------------------------------------------------- */
}
