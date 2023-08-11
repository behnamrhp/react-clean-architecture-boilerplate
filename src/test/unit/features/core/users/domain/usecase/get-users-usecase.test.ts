import { container } from "tsyringe";
import Users from "~/features/core/users/domain/entity/users";
import IUsersRepo, {
  IGetUsersRepoKey,
} from "~/features/core/users/domain/i-repository/i-users-repo";
import GetUsersUsecase from "~/features/core/users/domain/usecase/get-users-usecase";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { MOCKED_USERS_LIST } from "~/test/common/factory";

/* -------------------------------------------------------------------------- */
/*                                   Mocking                                  */
/* -------------------------------------------------------------------------- */
const mockedGetSuccessUsers = vi.fn(() => {
  const response = TE.right(MOCKED_USERS_LIST);
  return response;
});

class mockedRepo implements IUsersRepo {
  getUsers = mockedGetSuccessUsers;
}

/* -------------------------------------------------------------------------- */
/*                                     DI                                     */
/* -------------------------------------------------------------------------- */
const di = container;
di.registerSingleton(`${IGetUsersRepoKey}`, mockedRepo);

/* -------------------------------------------------------------------------- */
/*                                   Testing                                  */
/* -------------------------------------------------------------------------- */
describe(`${GetUsersUsecase.name}:`, () => {
  describe("Basic:", () => {
    afterEach(() => {
      vi.resetAllMocks();
      di.dispose();
    });

    it("Should return a list of users correctly", async () => {
      const getUsersUsecase = di.resolve(GetUsersUsecase);

      const users = (await getUsersUsecase.execute()()) as E.Right<Users[]>;

      expect(users.right).toStrictEqual(MOCKED_USERS_LIST);
    });
  });
});
/* -------------------------------------------------------------------------- */
