import React, { useEffect, useState } from "react";

const ImportantPage = () => {
  const [todos, setTodos] = useState([]);
  const fetchProduct = async () => {
    const response = await fetch(
      "https://api-class-o1lo.onrender.com/api/v1/todos/?priority=3"
    ).then((res) => res.json());
    setTodos(response.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const CheckCompleted = (item) => {
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
