import { Observable } from "rxjs";
import Users from "~/features/core/users/domain/entity/users";

export interface IUserTableVM {
  users$: Observable<Users[]>;
  title: string;
}

export interface IGetUsersPageProps {
  vm: IUserTableVM;
}
