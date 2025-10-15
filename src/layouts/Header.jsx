import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        background: "#282c34",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Danh sách công việc
      </h1>

      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "16px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/todos"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/important"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Important
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
