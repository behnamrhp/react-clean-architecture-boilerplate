/* eslint-disable react/no-unstable-nested-components */
import { CircularProgress } from "@mui/material";
import RXComponent from "~/bootstrap/helper/view/rx-component/rx-component";
import BallotIcon from "@mui/icons-material/Ballot";
import { IGetUsersPageProps } from "./i-users-table";
import Tables from "./tables";
import { StyledHeader } from "./style";

export default function UsersTable(props: IGetUsersPageProps) {
  const { vm } = props;

  return (
    <>
      <StyledHeader>
        {vm.title}
        <BallotIcon
          sx={{
            marginLeft: 1,
          }}
        />
      </StyledHeader>
      <RXComponent
        observable$={vm.users$}
        NextComponent={Tables}
        LoadingComponent={CircularProgress}
        loadingPattern={(data) => !data?.length}
        ErrorComponent={() => <div>some error happened</div>}
      />
    </>
  );
}
