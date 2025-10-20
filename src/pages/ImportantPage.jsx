import React, { useEffect, useState } from "react";
import { CheckCompleted, getPriorityLabel } from "../utils/todoHelpers";

const ImportantPage = () => {
  const [todos, setTodos] = useState([]);
  const fetchProduct = async () => {
    const response = await fetch(
      "https://api-class-o1lo.onrender.com/api/anhkh/todos/?priority=3"
    ).then((res) => res.json());
    setTodos(response.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div
      style={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 15,
      }}
    >
      {todos.length > 0 ? (
        todos.map((item, index) => {
          const status = CheckCompleted(item);
          const priority = getPriorityLabel(item.priority);
          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                backgroundColor: "#fafafa",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
              <p style={{ fontSize: 14, color: "#555" }}>{item.description}</p>
              <p>
                Trạng thái:{" "}
                <span style={{ fontWeight: "bold", color: status.color }}>
                  {status.text}
                </span>
              </p>
              <p>
                Mức độ ưu tiên:{" "}
                <span style={{ fontWeight: "bold", color: priority.color }}>
                  {priority.label}
                </span>
              </p>
              <p>
                Deadline: {new Date(item.dueDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          );
        })
      ) : (
        <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 20 }}>
          Không có công việc
        </div>
      )}
    </div>
  );
};

export default ImportantPage;
