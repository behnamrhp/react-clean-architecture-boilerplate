import { Observable } from "rxjs";
import Users from "~/features/core/users/domain/entity/users";

export interface IUserTableVM {
  users$: Observable<Users[]>;
}

export interface IGetUsersPageProps {
  vm: IUserTableVM;
}
