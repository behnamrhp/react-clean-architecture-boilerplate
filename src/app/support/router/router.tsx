import { createBrowserRouter } from "react-router-dom";
import GetUsersPage from "~/app/core/users/page/get-users-page";
import appConfigs from "~/bootstrap/config/app-configs";
/* -------------------------------------------------------------------------- */
const router = createBrowserRouter([
  {
    path: "/",
    element: <GetUsersPage />,
  },
  {
    path: appConfigs.routes.users,
    element: <div>users page</div>,
  },
]);
/* -------------------------------------------------------------------------- */
export default router;
