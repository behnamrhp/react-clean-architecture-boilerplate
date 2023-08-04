export default class BaseFailure extends Error {
/* -------------------------------------------------------------------------- */
  constructor(message?: string) {
        super(message);
        this.name = BaseFailure.name;
    }
/* -------------------------------------------------------------------------- */
}