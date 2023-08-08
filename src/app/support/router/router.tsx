import { RouteObject, createBrowserRouter } from "react-router-dom";
import GetUsersPage from "~/app/core/users/page/get-users-page";
import appConfigs from "~/bootstrap/config/app-configs";
/* -------------------------------------------------------------------------- */

class Router {
  /* ---------------------------------- Home ---------------------------------- */
  get homeRoutes(): RouteObject {
    return {
      path: "/",
      element: <GetUsersPage />,
    };
  }

  /* -------------------------------- Vehicles -------------------------------- */
  get vehicleRoutes(): RouteObject {
    return {
      path: appConfigs.routes.vehicles,
      element: <div>Vehicles page</div>,
    };
  }

  /* ---------------------------------- Init ---------------------------------- */
  get makeRouter() {
    return createBrowserRouter([this.homeRoutes, this.vehicleRoutes]);
  }

  /* --------------------------------- Factory -------------------------------- */
  static init() {
    const routerInitializer = new Router();
    return routerInitializer.makeRouter;
  }
  /* -------------------------------------------------------------------------- */
}

const router = Router.init();
export default router;
