import React, { Children, Component } from "react";
import MainLayout from "../layouts/MainLayout";
import Todos from "../components/Todos";
import { Navigate } from "react-router-dom";
import ImportantPage from "../pages/ImportantPage";
import TodoDetailPage from "../pages/TodoDetailPage";

const mainRoute = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", Component: Todos },
      { path: "important", Component: ImportantPage },
      { path: "todos/:id", Component: TodoDetailPage },
    ],
  },
];

export default mainRoute;
