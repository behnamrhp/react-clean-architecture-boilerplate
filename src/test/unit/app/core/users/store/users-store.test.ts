import usersStore from "~/app/core/users/store/users-store";
import { MOCKED_USERS_LIST } from "~/test/common/factory";

describe("Users-store:", () => {
  beforeEach(() => {
    usersStore.setState({ users: [] });
  });
  it("Should initilize correctly", () => {
    expect(() => usersStore.getState()).toBeTruthy();
  });

  it("Should inital user correctly", () => {
    usersStore.setState({ users: MOCKED_USERS_LIST });

    expect(usersStore.getState().users).toStrictEqual(MOCKED_USERS_LIST);
  });
  it("Should add users correctly", () => {
    usersStore.getState().addUsers(MOCKED_USERS_LIST);
    expect(usersStore.getState().users).toStrictEqual(MOCKED_USERS_LIST);
  });
});
