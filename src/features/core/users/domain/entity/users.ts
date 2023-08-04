export default class Users {
  id: string;

  name: string;

  email: string;

  constructor({ id, name, email }: Users) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
