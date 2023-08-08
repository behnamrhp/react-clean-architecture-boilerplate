import { useEffect } from "react";
import di from "~/bootstrap/di";
import IBaseVM from "~/bootstrap/helper/vm/i-base-vm";
import toStream from "~/bootstrap/helper/store/store-to-stream";
import { useTranslation } from "react-i18next";
import langKey from "~/bootstrap/i18n/langKey";
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
    const users$ = toStream(this.model.usersStore, (state) => state.users);
    const { t } = useTranslation();
    const title = t(langKey.users.usersList);

    useEffect(() => {
      this.model.initUsers();
    }, []);

    return {
      users$,
      title,
    };
  }

  /* --------------------------------- Factory -------------------------------- */
  static produce(): IUserTableVM {
    const modelDI = di.resolve<GetUsersModel>(GetUsersModel);
    return new UsersTableVM(modelDI).useVM();
  }
  /* -------------------------------------------------------------------------- */
}

export default UsersTableVM.produce;
