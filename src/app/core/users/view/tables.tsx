import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import appConfigs from "~/bootstrap/config/app-configs";
import Users from "~/features/core/users/domain/entity/users";

export default function Tables(props: { data: Users[] }) {
  const { data } = props;
  return (
    <Container>
      <DataGrid
        rows={data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }))}
        columns={[
          { field: "id", headerName: "ID" },
          { field: "name", headerName: "name" },
          { field: "email", headerName: "email" },
        ]}
      />
      <Link to={appConfigs.routes.vehicles}>Vehicles</Link>
    </Container>
  );
}
