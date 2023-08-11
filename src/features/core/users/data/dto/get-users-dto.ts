/**
 * This is a Data Transfer Object (DTO) class called "GetUsersInfoDTO".
 * It is used to transfer user information between datasource and repository.
 */
export class GetUsersInfoDTO {
  /* -------------------------------------------------------------------------- */
  public id: string;

  /* -------------------------------------------------------------------------- */
  public name: string;

  /* -------------------------------------------------------------------------- */
  public email: string;

  /* -------------------------------------------------------------------------- */
  constructor({
    id,
    name,
    email,
  }: {
    id: string;
    name: string;
    email: string;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
  /* -------------------------------------------------------------------------- */
}
