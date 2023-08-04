import React from "react";
import UsersTable from "../view/users-table";
import usersTableVm from "../vm/users-table-vm";

export default function GetUsersPage() {
  const vm = usersTableVm();
  return <UsersTable vm={vm} />;
}
