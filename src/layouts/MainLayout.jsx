import React, { useState } from "react";
import { Layout, theme, Typography, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const { Content, Header } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("auth");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("auth");
    nav("/auth/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        style={{ padding: 0, background: "#fff" }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            background: colorBgContainer,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Hi guy
          </Title>
          <Button type="primary" danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
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
