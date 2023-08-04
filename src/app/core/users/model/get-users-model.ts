import { inject, singleton } from "tsyringe";
import type NUsersStore from "../store/i-users-store";
import di from "~/bootstrap/di";
import usersStore from "../store/users-store";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import { pipe } from "fp-ts/lib/function";
import * as TE from 'fp-ts/lib/TaskEither';
import Users from "~/features/core/users/domain/entity/users";
import type Store from "~/bootstrap/helper/store/store-type";
import toStream from "~/bootstrap/helper/store/store-to-stream";
import { ObservableResource } from "observable-hooks";

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
  static produce() {
    const store = di.resolve<typeof usersStore>(`${usersStore}`);
    const usecase = di.resolve<GetUsersUsecase>(GetUsersUsecase);
    return new GetUsersModel(
      store, 
      usecase,
    );
  }
/* -------------------------------------------------------------------------- */
  initUsers(): void {
    const executer = pipe(
      this.getUsersUsecase.execute(),
      TE.chain((users) => TE.right(this.usersStore.getState().addUsers(users))),
      )
      executer();
  }
/* -------------------------------------------------------------------------- */
  private getResourceObservable(): ObservableResource<Users[]> {
    const observabeState = toStream(this.usersStore, (state) => state.users);
    const resource = new ObservableResource(
      observabeState,
      (value): value is Users[] => value.length > 0,
      );
    return resource;
  }
/* -------------------------------------------------------------------------- */
}