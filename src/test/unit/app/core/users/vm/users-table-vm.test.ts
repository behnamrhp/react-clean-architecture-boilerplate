import { renderHook } from "@testing-library/react-hooks";
import GetUsersModel from "~/app/core/users/model/get-users-model";
import UsersTableVM from "~/app/core/users/vm/users-table-vm";
import di from "~/bootstrap/di";
import langKey from "~/bootstrap/i18n/langKey";
import usersStore from "~/app/core/users/store/users-store";
import { TestScheduler } from "rxjs/testing";

const testScheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected),
);
/* -------------------------------------------------------------------------- */
/*                                   Mocking                                  */
/* -------------------------------------------------------------------------- */
const mockedGetUsersModel = vitest.fn().mockImplementation(() => ({
  users: () => [],
  initUsers: () => Promise.resolve(undefined),
  usersStore,
}));
/* -------------------------------------------------------------------------- */
/*                                     DI                                     */
/* -------------------------------------------------------------------------- */
di.registerSingleton(GetUsersModel, mockedGetUsersModel);
/* -------------------------------------------------------------------------- */
/*                                   Testing                                  */
/* -------------------------------------------------------------------------- */
describe("UsersTableVM", () => {
  describe("Basics:", () => {
    it("Should run without no error", () => {
      const usersTableVM = new UsersTableVM();

      const hook = renderHook(() => usersTableVM.useVM());

      expect(hook).toBeTruthy();
    });
  });

  it("Should return correct title", () => {
    const usersTableVM = new UsersTableVM();

    const hook = renderHook(() => usersTableVM.useVM());

    expect(hook.result.current.title).toBe(langKey.users.usersList);
  });

  it("Observable Users should return empty arrya on initial state of vm", () => {
    const usersTableVM = new UsersTableVM();
    const hook = renderHook(() => usersTableVM.useVM());
    const { users$ } = hook.result.current;

    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const expectedMarbles = "a";

      expectObservable(users$).toBe(expectedMarbles, {
        a: [],
      });
    });
  });
});
