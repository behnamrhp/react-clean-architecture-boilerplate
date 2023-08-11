import { RouteObject, createBrowserRouter } from "react-router-dom";
import GetUsersPage from "~/app/core/users/page/get-users-page";
import appConfigs from "~/bootstrap/config/app-configs";
/* -------------------------------------------------------------------------- */

/**
 * This Class is responsible for creating and initializing routes for a web application.
 * This code provides a basic structure for
 *  defining and initializing routes for a web application using a router.
 */
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
  /**
   * method returns a created browser router by passing an array of
   *  route objects (homeRoutes and vehicleRoutes) to t
   *  he "createBrowserRouter" function.
   */
  get makeRouter() {
    return createBrowserRouter([this.homeRoutes, this.vehicleRoutes]);
  }

  /* --------------------------------- Factory -------------------------------- */
  /**
   * initializes an instance of the Router class and returns the created router.
   */
  static init() {
    const routerInitializer = new Router();
    return routerInitializer.makeRouter;
  }
  /* -------------------------------------------------------------------------- */
}

const router = Router.init();
export default router;
