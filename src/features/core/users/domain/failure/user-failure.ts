import BaseFailure from "~/features/common/failures/base-failure";

export default class UsersFailuer extends BaseFailure {
/* -------------------------------------------------------------------------- */
  constructor(message: string) {
    super(message);
    this.name = UsersFailuer.name;
  }
/* -------------------------------------------------------------------------- */
}