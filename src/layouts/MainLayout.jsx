import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Todos from "../components/Todos";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
