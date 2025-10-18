import React, { useEffect, useState } from "react";
import { createTodo, getTodoId, updateTodo } from "../api/apiTodo";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
  Card,
  message,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

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

  const handleSelectChange = (value) => {
    setFormData({ ...formData, priority: value });
  };

  const handleDateChange = (date, dateString) => {
    setFormData({ ...formData, dueDate: dateString });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.priority = Number(formData.priority);
    if (
      !formData.name ||
      formData.name.length < 3 ||
      formData.name.length > 80
    ) {
      message.warning("Tên công việc phải từ 3 - 80 ký tự");
      return;
    }
    if (!formData.dueDate) {
      message.warning("Vui lòng chọn hạn hoàn thành công việc");
      return;
    }

    try {
      if (!id) {
        await createTodo(formData);
        message.success("Thêm mới thành công");
        nav("/todos");
      } else {
        await updateTodo(id, formData);
        message.success("Cập nhật thành công");
        nav("/todos");
      }
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi khi xử lý");
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
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Card
        title={!id ? "Thêm công việc mới" : "Cập nhật công việc"}
        style={{ width: 500, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
      >
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label="Tên công việc" required>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên công việc"
            />
          </Form.Item>

          <Form.Item label="Mức độ ưu tiên">
            <Select
              value={formData.priority}
              onChange={handleSelectChange}
              name="priority"
            >
              <Option value={1}>Thấp</Option>
              <Option value={2}>Trung bình</Option>
              <Option value={3}>Cao</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Mô tả công việc">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Nhập mô tả công việc"
            />
          </Form.Item>

          <Form.Item label="Hạn chót hoàn thành công việc" required>
            <DatePicker
              style={{ width: "100%" }}
              name="dueDate"
              onChange={handleDateChange}
              value={formData.dueDate ? dayjs(formData.dueDate) : null}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          {id && (
            <Form.Item label="Trạng thái công việc">
              <Checkbox
                name="isCompleted"
                checked={formData.isCompleted}
                onChange={handleCheckBox}
                disabled={
                  formData.isCompleted ||
                  new Date(formData.dueDate) < new Date()
                }
              >
                Hoàn thành
              </Checkbox>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {!id ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FormTodo;
