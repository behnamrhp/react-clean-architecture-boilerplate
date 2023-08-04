import { extend } from "fp-ts";
import Users from "~/features/core/users/domain/entity/users";

namespace NUsersStore {
  export type UsersStore = {
    users: Users[];
  }

  export type events = {
    addUsers: (users: Users[]) => void;
  }

  export interface IUsersStore extends events, UsersStore {}
}

export default NUsersStore;