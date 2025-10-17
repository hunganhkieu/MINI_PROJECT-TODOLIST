import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `https://api-class-o1lo.onrender.com/api/v1/todos/?_limit=4&_page=${currentPage}${
            search ? `&q=${search}` : ""
          }${filterPriority ? `&priority=${filterPriority}` : ""}${
            sortOrder ? `&_sort=priority&_order=${sortOrder}` : ""
          }${filterComplete ? `&completed=${filterComplete}` : filterComplete}${
            filterDueDate_lte ? `&dueDate_lte=${filterDueDate_lte}` : ""
          }${filterDueDate_gte ? `&dueDate_gte=${filterDueDate_gte}` : ""}`
        ).then((res) => res.json());
        setTodos(response.data);
        setMetaData(response.meta);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, [
    search,
    currentPage,
    filterPriority,
    sortOrder,
    filterComplete,
    filterDueDate_lte,
    filterDueDate_gte,
  ]);

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

  const handleReset = () => {
    setSearch("");
    setFilterPriority("");
    setFilterComplete("");
    setSortOrder("");
    setCurrentPage(1);
  };
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        {/* search */}
        <input
          type="text"
          placeholder="Nhập từ khóa..."
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") setSearch(e.target.value);
          }}
        />

        {/* filter Priority */}
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

        {/* sort Priority */}
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
              setFilterComplete(e.target.value);
            }
          }}
        >
          <option value="">Trạng thái công việc</option>
          <option value="false">Đang thực hiện</option>
          <option value="overdue">Quá hạn</option>
          <option value="true">Hoàn thành</option>
        </select>

        <button onClick={handleReset}>reset</button>
      </div>

      <div
        style={{
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
                <p style={{ fontSize: 14, color: "#555" }}>
                  {item.description}
                </p>
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
                <Link to={`${item._id}`}>
                  <button>Xem chi tiết</button>
                </Link>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 20 }}>
            Không có công việc
          </div>
        )}
      </div>

      {metaData && metaData.totalPages > 1 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {Array.from({ length: metaData.totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                borderRadius: 5,
                backgroundColor:
                  index + 1 === currentPage ? "#f48fb1" : "#e0e0e0",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
