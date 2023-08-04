import Users from "~/features/core/users/domain/entity/users";

export interface IUserTableVM {
  users: Users[]
}

export interface IGetUsersPageProps {
  vm : IUserTableVM;
}