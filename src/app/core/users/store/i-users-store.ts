import Users from "~/features/core/users/domain/entity/users";

/**
 * Every store should have a type that defines
 *  the shape of the store.
 * This type is used to define the shapee of
 *  store and events in the store.
 */
namespace NUsersStore {
  export type UsersStore = {
    users: Users[];
  };

  export type events = {
    addUsers: (users: Users[]) => void;
  };

  export interface IUsersStore extends events, UsersStore {}
}

export default NUsersStore;
