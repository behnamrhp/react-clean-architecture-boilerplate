import React from "react";
import UsersTable from "../view/users-table";
import UsersTableVM from "../vm/users-table-vm";

/**
 * The Page related to this domain will be render here.
 * In this component we relate proper vm to needed view.
 */
export default function GetUsersPage() {
  const vm = new UsersTableVM().useVM();
  return <UsersTable vm={vm} />;
}
