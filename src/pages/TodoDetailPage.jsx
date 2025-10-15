import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState(null);

  const fetchProductId = async () => {
    try {
      const response = await fetch(
        `https://api-class-o1lo.onrender.com/api/v1/todos/${id}`
      );
      const { data } = await response.json();
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductId();
  }, []);

  const CheckCompleted = (item) => {
    if (!item) return { text: "Đang tải...", color: "#9e9e9e" };
    if (item.completed) return { text: "Hoàn thành", color: "#4caf50" };
    if (new Date(item.dueDate) < new Date())
      return { text: "Quá hạn", color: "#f44336" };
    return { text: "Đang thực hiện", color: "#ff9800" };
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return { label: "Thấp", color: "#90caf9" };
      case 2:
        return { label: "Trung bình", color: "#fdd835" };
      case 3:
        return { label: "Cao", color: "#f44336" };
      default:
        return { label: "Không xác định", color: "#9e9e9e" };
    }
  };
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
      <Link to="/">
        <button>Quay lại</button>
      </Link>
    </div>
  );
};

export default TodoDetailPage;
