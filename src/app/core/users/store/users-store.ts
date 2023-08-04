import { createStore } from "zustand/vanilla";
import NUsersStore from "./i-users-store";

const usersStore = createStore<NUsersStore.IUsersStore>((emit) => ({
  users: [],
  addUsers(users) {
    emit(() => ({
      users,
    }));
  },
}));

export default usersStore;
