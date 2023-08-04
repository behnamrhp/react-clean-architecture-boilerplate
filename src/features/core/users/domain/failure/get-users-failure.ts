import UsersFailuer from "./user-failure";

export default class GetUsersFailure extends UsersFailuer { 
  constructor(message?: string) {
    super(message? message : GetUsersFailure.name);
    this.name = GetUsersFailure.name;
  }
}