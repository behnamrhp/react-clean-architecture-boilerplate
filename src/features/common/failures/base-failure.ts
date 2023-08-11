/**
 * This is a class called  BaseFailure  that extends the  Error  class. It is
 *  used as a base class for creating custom failure classes.
 */
export default class BaseFailure extends Error {
  /* -------------------------------------------------------------------------- */
  constructor(message?: string) {
    super(message);
    this.name = BaseFailure.name;
  }
  /* -------------------------------------------------------------------------- */
}
