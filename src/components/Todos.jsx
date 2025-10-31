import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTodo } from "../api/apiTodo";
import {
  Button,
  Input,
  Select,
  Card,
  Space,
  Row,
  Col,
  Tag,
  message,
} from "antd";
import { CheckCompleted, getPriorityLabel } from "../utils/todoHelpers";

const { Option } = Select;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [metaData, setMetaData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPriority, setFilterPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterComplete, setFilterComplete] = useState("");
  const [filterDueDate_lte, setFilterDueDate_lte] = useState("");
  const [filterDueDate_gte, setFilterDueDate_gte] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api-class-o1lo.onrender.com/api/anhkh/todos/?_limit=6&_page=${currentPage}${
          search ? `&q=${search}` : ""
        }${filterPriority ? `&priority=${filterPriority}` : ""}${
          sortOrder ? `&_sort=priority&_order=${sortOrder}` : ""
        }${filterComplete ? `&isCompleted=${filterComplete}` : filterComplete}${
          filterDueDate_lte ? `&dueDate_lte=${filterDueDate_lte}` : ""
        }${filterDueDate_gte ? `&dueDate_gte=${filterDueDate_gte}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") ||
              sessionStorage.getItem("accessToken")
            }`,
          },
        }
      ).then((res) => res.json());
      setTodos(response.data);
      setMetaData(response.meta);
    } catch (error) {
      console.error(error);
    }
  }, [
    search,
    currentPage,
    filterPriority,
    sortOrder,
    filterComplete,
    filterDueDate_lte,
    filterDueDate_gte,
  ]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleReset = () => {
    setSearch("");
    setFilterPriority("");
    setFilterComplete("");
    setSortOrder("");
    setFilterDueDate_lte("");
    setFilterDueDate_gte("");
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có muốn xóa không?")) return;
    await deleteTodo(id);
    message.success("Xóa thành công");
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "30px auto" }}>
      <Space wrap style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Nhập từ khóa..."
          onSearch={(value) => setSearch(value)}
          style={{ width: 200 }}
        />

        <select
          value={filterPriority}
          onChange={(e) => {
            setFilterPriority(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginLeft: 10, padding: 8, borderRadius: 5 }}
        >
          <option value="">Tất cả mức độ ưu tiên</option>
          <option value="1">Thấp</option>
          <option value="2">Trung bình</option>
          <option value="3">Cao</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginLeft: 10, padding: 8, borderRadius: 5 }}
        >
          <option value="">Sắp xếp theo độ ưu tiên</option>
          <option value="asc">Thấp đến Cao</option>
          <option value="desc">Cao đến Thấp</option>
        </select>

        {/* filter Completed */}
        <select
          name=""
          id=""
          value={filterComplete}
          onChange={(e) => {
            setFilterComplete(e.target.value);
            setFilterDueDate_lte("");
            setFilterDueDate_gte("");

            const dataToday = new Date();
            // dataToday.setDate(dataToday.getDate() + 1);
            const valueDate = dataToday.toISOString().slice(0, 10);
            setFilterComplete(e.target.value);

            if (e.target.value === "overdue") {
              setFilterComplete("false");
              setFilterDueDate_lte(valueDate);
            }

            if (e.target.value === "false") {
              setFilterComplete(e.target.value);
              setFilterDueDate_gte(valueDate);
            }

            if (e.target.value === "true") {
              setFilterDueDate_lte(false);
            }
          }}
        >
          <option value="">Trạng thái công việc</option>
          <option value="false">Đang thực hiện</option>
          <option value="overdue">Quá hạn</option>
          <option value="true">Hoàn thành</option>
        </select>

        <Button onClick={handleReset}>Reset</Button>
        <Link to="add">
          <Button type="primary">Thêm mới công việc</Button>
        </Link>
      </Space>

      <Row gutter={[16, 16]}>
        {todos.length > 0 ? (
          todos.map((item, index) => {
            const status = CheckCompleted(item);
            const priority = getPriorityLabel(item.priority);
            return (
              <Col key={index} xs={24} sm={12} md={8}>
                <Card
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
                    Hạn chót:{" "}
                    {new Date(item.dueDate).toLocaleDateString("vi-VN")}
                  </p>
                  <Space>
                    <Link to={`${item._id}`}>
                      <Button size="small">Xem chi tiết</Button>
                    </Link>
                    <Link to={`update/${item._id}`}>
                      <Button type="default" size="small">
                        Cập nhật
                      </Button>
                    </Link>
                    <Button
                      danger
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xóa
                    </Button>
                  </Space>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col span={24} style={{ textAlign: "center", padding: 30 }}>
            Không có công việc
          </Col>
        )}
      </Row>

      {metaData && metaData.totalPages > 1 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {Array.from({ length: metaData.totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              type={index + 1 === currentPage ? "primary" : "default"}
              style={{ margin: "0 5px" }}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
