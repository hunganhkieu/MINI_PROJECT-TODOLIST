import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCompleted, getPriorityLabel } from "../utils/todoHelpers";

const TodoDetailPage = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState(null);

  const fetchProductId = async () => {
    try {
      const response = await fetch(
        `https://api-class-o1lo.onrender.com/api/anhkh/todos/${id}`
      );
      const { data } = await response.json();
      setTodos(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductId();
  }, []);

  const status = CheckCompleted(todos);
  const priority = getPriorityLabel(todos?.priority);

  return (
    <div>
      <h2>Chi tiết công việc</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 15,
          backgroundColor: "#fafafa",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>{todos?.name}</h3>
        <p style={{ fontSize: 14, color: "#555" }}>{todos?.description}</p>
        <p>
          Trạng thái:{" "}
          <span style={{ fontWeight: "bold", color: status.color }}>
            {status?.text}
          </span>
        </p>
        <p>
          Mức độ ưu tiên:{" "}
          <span
            style={{
              fontWeight: "bold",
              color: priority?.color,
            }}
          >
            {priority?.label}
          </span>
        </p>
        <p>Deadline: {new Date(todos?.dueDate).toLocaleDateString("vi-VN")}</p>
      </div>
      <Link to="/todos">
        <button>Quay lại</button>
      </Link>
    </div>
  );
};

export default TodoDetailPage;
