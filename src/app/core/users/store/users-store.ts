import { createStore } from "zustand/vanilla";
import { combine, subscribeWithSelector } from "zustand/middleware";
import NUsersStore from "./i-users-store";
import Users from "~/features/core/users/domain/entity/users";

const usersStore = createStore(
  subscribeWithSelector(
    combine<NUsersStore.UsersStore, NUsersStore.events>(
      { users: [] as Users[] }, 
      (emit) => ({
      addUsers(users) {
        emit(() => ({
          users,
        }));
      },
    })),
  ),
);

export default usersStore;
