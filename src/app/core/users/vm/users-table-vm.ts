import { useEffect, useState } from "react";
import di from "~/bootstrap/di";
import IBaseVM from "~/bootstrap/helper/vm/i-base-vm";
import Users from "~/features/core/users/domain/entity/users";
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
    const [users, setUsers] = useState<Users[]>([]);

    this.sideEffect(setUsers);
    return {
      users,
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
