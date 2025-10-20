import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mainRoute from "./mainRoute";
import NotFoundPage from "../pages/NotFoundPage";
import authRoutes from "./authRoutes";

let route = createBrowserRouter([
  ...mainRoute,
  ...authRoutes,
  { path: "*", Component: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={route} />;
};

export default AppRouter;
