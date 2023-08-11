import GetUsersModel from "~/app/core/users/model/get-users-model";
import usersStore from "~/app/core/users/store/users-store";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import * as TE from "fp-ts/lib/TaskEither";
import di from "~/bootstrap/di";
import { MOCKED_USERS_LIST } from "~/test/common/factory";

/* -------------------------------------------------------------------------- */
/*                                   Mocking                                  */
/* -------------------------------------------------------------------------- */
const mockedGetUsersUsecase = vi.fn().mockImplementation(() => ({
  execute: () => TE.right(MOCKED_USERS_LIST),
}));

/* -------------------------------------------------------------------------- */
/*                                     DI                                     */
/* -------------------------------------------------------------------------- */
di.register(`${usersStore}`, { useValue: usersStore });
di.registerSingleton(GetUsersUsecase, mockedGetUsersUsecase);

/* -------------------------------------------------------------------------- */
/*                                   Testing                                  */
/* -------------------------------------------------------------------------- */
describe(`${GetUsersModel.name}`, () => {
  beforeEach(() => {
    vi.resetModules();
  });
  describe("Basic:", () => {
    it("Should save and return a list of users correctly", async () => {
      const model = di.resolve(GetUsersModel);

      await model.initUsers();

      expect(model.users).toStrictEqual(MOCKED_USERS_LIST);
    });
  });
});
