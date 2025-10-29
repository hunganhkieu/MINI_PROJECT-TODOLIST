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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      if (!id) {
        await createTodo(formData);
        alert("Thêm mới thành công");
        nav("/todos");
        // console.log(formData);
      }
      if (id) {
        await updateTodo(id, formData);
        alert("Cập nhật thành công");
        nav("/todos");
        // console.log(formData);
      }
    } catch (error) {
      console.log(error);
      alert("Lỗi rồi");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBox = (e) => {
    const { checked, name } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: checked,
    }));
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          {!id ? "Thêm công việc mới" : "Cập nhật công việc"}
        </h2>

        {/* Tên công việc */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Tên công việc
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập tên công việc"
          />
        </div>

        {/* Mức độ ưu tiên */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Mức độ ưu tiên
          </label>
          <select
            name="priority"
            id="priority"
            onChange={handleChange}
            value={formData.priority}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value={1}>Thấp</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Cao</option>
          </select>
        </div>

        {/* Mô tả công việc */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Mô tả công việc
          </label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows="3"
            placeholder="Nhập mô tả công việc"
          ></textarea>
        </div>

        {/* Hạn chót hoàn thành */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Hạn chót hoàn thành công việc
          </label>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={formData.dueDate}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Trạng thái công việc */}
        {id && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleCheckBox}
              disabled={formData.isCompleted}
              className="h-4 w-4 text-blue-600 accent-blue-500"
            />
            <label className="text-gray-700 font-medium">Hoàn thành</label>
          </div>
        )}

        {/* Nút Submit */}
        <button
          type="submit"
          className={`w-full py-2 font-semibold text-white rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {!id ? "Thêm mới" : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default FormTodo;
