import React, { Children, Component } from "react";
import MainLayout from "../layouts/MainLayout";
import Todos from "../components/Todos";
import { Navigate } from "react-router-dom";
import ImportantPage from "../pages/ImportantPage";
import TodoDetailPage from "../pages/TodoDetailPage";
import FormTodo from "../pages/FormTodo";
import PrivateRoute from "./protected/PrivateRoute";

const mainRoute = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to={"/auth/login"} /> },
      { path: "todos", Component: Todos },
      { path: "important", Component: ImportantPage },
      { path: "todos/:id", Component: TodoDetailPage },
      { path: "todos/add", Component: FormTodo },
      { path: "todos/update/:id", Component: FormTodo },
    ],
  },
];

export default mainRoute;
