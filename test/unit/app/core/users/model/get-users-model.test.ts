/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
//
//
import { container } from "tsyringe";
import GetUsersModel from "~/app/core/users/model/get-users-model";
import usersStore from "~/app/core/users/store/users-store";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import * as TE from "fp-ts/lib/TaskEither";
import IUsersRepo, {
  IGetUsersRepoKey,
} from "~/features/core/users/domain/i-repository/i-users-repo";

console.log("-1");
// vi.mock("src/features/core/users/domain/usecase/get-users-usecase");

console.log("0");
console.log("1");
console.log("2");
console.log("3");
console.log("4");
console.log("5");

console.log(GetUsersUsecase);
/* -------------------------------------------------------------------------- */
/*                                   Mocking                                  */
/* -------------------------------------------------------------------------- */
const mockedGetSuccessUsers = vi.fn(() => {
  const response = TE.right([]);
  return response;
});

class mockedRepo implements IUsersRepo {
  getUsers = mockedGetSuccessUsers;
}

class MockUsecase {
  constructor() {
    console.log("heeeeerreeee");
  }

  execute = vi.fn(() => TE.right([]));
}

/* -------------------------------------------------------------------------- */
/*                                     DI                                     */
/* -------------------------------------------------------------------------- */
const di = container.createChildContainer();

di.register(`${usersStore}`, { useValue: usersStore });
// di.registerSingleton(`${IGetUsersRepoKey}`, mockedRepo);
di.registerSingleton(GetUsersModel, GetUsersModel);
di.registerSingleton(GetUsersUsecase, MockUsecase);
/* -------------------------------------------------------------------------- */
/*                                   Testing                                  */
/* -------------------------------------------------------------------------- */
describe(`${GetUsersModel.name}:`, () => {
  beforeEach(() => {
    vi.resetModules();
    di.reset();
  });
  describe("Basic:", () => {
    it("Should return a list of users correctly", () => {
      console.log("hihihi");
      const getUsersModel = di.resolve(GetUsersModel);
      console.log("2");

      console.log(getUsersModel.users);
      expect(getUsersModel.users).toStrictEqual([]);
    });
  });
});
