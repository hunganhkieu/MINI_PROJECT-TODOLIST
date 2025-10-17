// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  StarOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const items = [
    {
      key: "/todos",
      icon: <PieChartOutlined />,
      label: <Link to="/todos">Home</Link>,
    },
    {
      key: "/important",
      icon: <StarOutlined />,
      label: <Link to="/important">Important</Link>,
    },
    // {
    //   key: "/files",
    //   icon: <FileOutlined />,
    //   label: <Link to="/files">Files</Link>,
    // },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div
        style={{
          height: 64,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        ToDoList
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
