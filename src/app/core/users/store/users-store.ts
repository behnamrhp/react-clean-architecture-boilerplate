import { createStore } from "zustand/vanilla";
import { combine, subscribeWithSelector } from "zustand/middleware";
import toStream from "~/bootstrap/helper/store/store-to-stream";
import { create } from "@mui/material/styles/createTransitions";
import NUsersStore from "./i-users-store";

const usersStore = createStore(
  subscribeWithSelector(
    combine({ users: [] }, (emit) => ({
      addUsers(users) {
        emit(() => ({
          users,
        }));
      },
    })),
  ),
);

export default usersStore;
