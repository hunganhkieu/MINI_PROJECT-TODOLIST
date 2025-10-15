import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mainRoute from "./mainRoute";
import NotFoundPage from "../pages/NotFoundPage";

let route = createBrowserRouter([
  ...mainRoute,
  { path: "*", Component: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={route} />;
};

export default AppRouter;
