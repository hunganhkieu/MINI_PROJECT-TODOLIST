import React, { useEffect, useState } from "react";
import { Card, Tag, Space } from "antd";
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
    <div style={{ maxWidth: 1000, margin: "30px auto" }}>
      <h2 style={{ marginBottom: 16, fontWeight: "bold" }}>
        Công việc quan trọng
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 16,
        }}
      >
        {todos.length > 0 ? (
          todos.map((item, index) => {
            const status = CheckCompleted(item);
            const priority = getPriorityLabel(item.priority);

            return (
              <Card
                key={index}
                title={item.name}
                bordered
                extra={
                  <Tag color={status.color} style={{ fontWeight: 500 }}>
                    {status.text}
                  </Tag>
                }
              >
                <p>{item.description || "Không có mô tả"}</p>
                <p>
                  Mức độ ưu tiên:{" "}
                  <Tag color={priority.color}>{priority.label}</Tag>
                </p>
                <p>
                  Deadline: {new Date(item.dueDate).toLocaleDateString("vi-VN")}
                </p>
              </Card>
            );
          })
        ) : (
          <div
            style={{ gridColumn: "1 / -1", textAlign: "center", padding: 30 }}
          >
            Không có công việc
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantPage;
