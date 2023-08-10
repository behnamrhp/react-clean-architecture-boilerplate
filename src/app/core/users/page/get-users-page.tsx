import React from "react";
import UsersTable from "../view/users-table";
import UsersTableVM from "../vm/users-table-vm";

export default function GetUsersPage() {
  const vm = new UsersTableVM().useVM();
  return <UsersTable vm={vm} />;
}
