import { Children, Component } from "react";
import LayoutAuth from "../layouts/LayoutAuth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AuthProtected from "./protected/AuthProtected";

const authRoutes = [
  {
    path: "auth",
    element: (
      <AuthProtected>
        <LayoutAuth />
      </AuthProtected>
    ),
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },
];
export default authRoutes;
