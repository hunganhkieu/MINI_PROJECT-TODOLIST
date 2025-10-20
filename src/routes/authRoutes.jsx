import { Children, Component } from "react";
import LayoutAuth from "../layouts/LayoutAuth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const authRoutes = [
  {
    path: "auth",
    Component: LayoutAuth,
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },
];
export default authRoutes;
