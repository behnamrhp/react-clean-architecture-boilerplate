import { useEffect } from "react";
import di from "~/bootstrap/di";
import IBaseVM from "~/bootstrap/helper/vm/i-base-vm";
import toStream from "~/bootstrap/helper/store/store-to-stream";
import { useTranslation } from "react-i18next";
import langKey from "~/bootstrap/i18n/langKey";
import { IUserTableVM } from "../view/i-users-table";
import GetUsersModel from "../model/get-users-model";

/**
 * This class is responsible for managing the view model (VM) for
 *  the UsersTable component.
 * It implements the IBaseVM interface,
 *  which defines the common methods and properties for all view models.
 */
class UsersTableVM implements IBaseVM<IUserTableVM> {
  /* ------------------------------ Dependencies ------------------------------ */
  private model: GetUsersModel;

  /* -------------------------------------------------------------------------- */
  constructor() {
    this.model = di.resolve<GetUsersModel>(GetUsersModel);
  }

  /* -------------------------------------------------------------------------- */
  /**
   * This method is called by the UsersTable component
   *  to retrieve the view model.
   * It returns an object that contains the necessary data
   *  and functions to be used by the component.
   * It uses the toStream function to convert the usersStore
   *  observable from the model into a stream of users data.
   * It uses the useTranslation hook to access the
   *  translation function (t) and translates the key 'users.usersList' to get the title for the component.
   * It also includes an useEffect hook to initialize
   *  the users data by calling the initUsers method from the model when the component is mounted.
   */
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
  /* -------------------------------------------------------------------------- */
}

export default UsersTableVM;
