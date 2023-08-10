import { faker } from "@faker-js/faker";
import Users from "~/features/core/users/domain/entity/users";

export const MOCKED_USERS_LIST = [
  new Users({
    id: faker.number.int().toString(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
  }),
];
