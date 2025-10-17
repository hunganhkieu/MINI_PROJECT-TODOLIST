import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      ToDoList ©{new Date().getFullYear()}
    </AntFooter>
  );
};

export default Footer;
