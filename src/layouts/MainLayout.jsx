// MainLayout.js
import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        style={{ padding: 0, background: "#fff" }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
