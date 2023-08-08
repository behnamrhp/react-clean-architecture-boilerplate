/* eslint-disable react/no-unstable-nested-components */
import { CircularProgress } from "@mui/material";
import RXComponent from "~/bootstrap/helper/view/rx-component/rx-component";
import { IGetUsersPageProps } from "./i-users-table";
import Tables from "./tables";

export default function UsersTable(props: IGetUsersPageProps) {
  const { vm } = props;

  return (
    <>
      <h1>{vm.title}</h1>
      <RXComponent
        observable$={vm.users$}
        NextComponent={Tables}
        LoadingComponent={CircularProgress}
        ErrorComponent={() => <div>some error happened</div>}
      />
    </>
  );
}
