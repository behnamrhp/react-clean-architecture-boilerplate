/**
 * It is responsible for initializing the repositories and
 *  data sources related to related module.
 */
export default interface IModulesDI {
  /* -------------------------------------------------------------------------- */
  initRepositories(): void;
  /* -------------------------------------------------------------------------- */
  initDatasources(): void;
  /* -------------------------------------------------------------------------- */
  init(): void;
  /* -------------------------------------------------------------------------- */
}
