import React, { useEffect, useState } from "react";
import { createTodo, getTodoId, updateTodo } from "../api/apiTodo";
import { useNavigate, useParams } from "react-router-dom";

const FormTodo = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    description: "",
    dueDate: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.priority = Number(formData.priority);
    if (
      !formData.name ||
      formData.name.length < 3 ||
      formData.name.length > 80
    ) {
      alert(
        "Tên ko được để trống, tên phải tối thiểu 3 ký tự và tối đa 80 ký tự"
      );
      return;
    }
    if (!formData.dueDate) {
      alert("Hạn hoàn thành công việc ko được để trống");
      return;
    }

    try {
      if (!id) {
        await createTodo(formData);
        alert("Thêm mới thành công");
        nav("/todos");
        console.log(formData);
      }
      if (id) {
        await updateTodo(id, formData);
        alert("Cập nhật thành công");
        nav("/todos");
        console.log(formData);
      }
    } catch (error) {
      console.log(error);
      alert("Lỗi rồi");
    }
  };
  const handleCheckBox = (e) => {
    const { checked, name } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: checked,
    }));
    console.log(name, checked);
  };
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await getTodoId(id);
          const formattedData = {
            ...data,
            dueDate: data.dueDate
              ? new Date(data.dueDate).toISOString().slice(0, 10)
              : "",
            priority: Number(data.priority),
            isCompleted: Boolean(data.isCompleted),
          };
          setFormData(formattedData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Tên công việc</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor="">Mức độ ưu tiên</label>
          <select
            name="priority"
            id="priority"
            onChange={handleChange}
            value={formData.priority}
          >
            <option value={1}>Thấp</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Cao</option>
          </select>
        </div>

        <div>
          <label htmlFor="">Mô tả công việc</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <div>
          <label htmlFor="">Hạn chót hoàn thành công việc</label>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={formData.dueDate}
          />
        </div>

        {id ? (
          <div>
            <label htmlFor="">Trạng thái công việc</label>
            <input
              type="checkbox"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleCheckBox}
              disabled={
                formData.isCompleted || new Date(formData.dueDate) < new Date()
              }
            />
            <label htmlFor="">Hoàn thành</label>
          </div>
        ) : null}
        <button>{!id ? "Thêm mới" : "Cập nhật"}</button>
      </form>
    </div>
  );
};

export default FormTodo;
