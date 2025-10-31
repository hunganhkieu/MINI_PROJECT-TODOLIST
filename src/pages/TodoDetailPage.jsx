import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Tag, Button, Space } from "antd";
import { CheckCompleted, getPriorityLabel } from "../utils/todoHelpers";

const TodoDetailPage = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState(null);

  const fetchProductId = async (id) => {
    try {
      const response = await fetch(
        `https://api-class-o1lo.onrender.com/api/anhkh/todos/${id}`
      );
      const { data } = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductId(id);
  }, [id]);

  if (!todos)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>Đang tải...</div>
    );

  const status = CheckCompleted(todos);
  const priority = getPriorityLabel(todos?.priority);

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>
        Chi tiết công việc
      </h2>

      <Card
        title={todos?.name}
        bordered
        extra={
          <Tag color={status.color} style={{ fontWeight: 500 }}>
            {status?.text}
          </Tag>
        }
      >
        <p>{todos?.description || "Không có mô tả"}</p>

        <p>
          Mức độ ưu tiên: <Tag color={priority?.color}>{priority?.label}</Tag>
        </p>

        <p>Deadline: {new Date(todos?.dueDate).toLocaleDateString("vi-VN")}</p>

        <Space style={{ marginTop: 20 }}>
          <Link to="/todos">
            <Button type="default">Quay lại</Button>
          </Link>
          <Link to={`/todos/update/${todos?._id}`}>
            <Button type="primary">Cập nhật</Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default TodoDetailPage;
