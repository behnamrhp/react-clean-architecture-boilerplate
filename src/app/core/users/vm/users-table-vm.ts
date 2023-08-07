import { useEffect } from "react";
import di from "~/bootstrap/di";
import IBaseVM from "~/bootstrap/helper/vm/i-base-vm";
import Users from "~/features/core/users/domain/entity/users";
import toStream from "~/bootstrap/helper/store/store-to-stream";
import { IUserTableVM } from "../view/i-users-table";
import GetUsersModel from "../model/get-users-model";

class UsersTableVM implements IBaseVM<IUserTableVM> {
  /* ------------------------------ Dependencies ------------------------------ */
  private model: GetUsersModel;

  /* -------------------------------------------------------------------------- */
  constructor(model: GetUsersModel) {
    this.model = model;
  }

  /* -------------------------------------------------------------------------- */
  useVM(): IUserTableVM {
    const users$ = toStream(this.model.usersStore, (state) => state.users, {
      fireImmediately: false,
    });

    useEffect(() => {
      this.model.initUsers();
    }, []);

    return {
      users$,
    };
  }

  /* -------------------------------------------------------------------------- */
  private sideEffect(setUsers: React.Dispatch<React.SetStateAction<Users[]>>) {
    useEffect(() => {
      this.model.initUsers();
      const unsubscriber = this.model.usersStore.subscribe((userStore) => {
        setUsers(userStore.users);
      });

      return () => unsubscriber();
    }, []);
  }

  /* --------------------------------- Factory -------------------------------- */
  static produce(): IUserTableVM {
    const modelDI = di.resolve<GetUsersModel>(GetUsersModel);
    return new UsersTableVM(modelDI).useVM();
  }
  /* -------------------------------------------------------------------------- */
}

export default UsersTableVM.produce;
