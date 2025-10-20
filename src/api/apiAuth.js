import { toast } from "react-toastify";
import api from ".";

const URL = "https://api-class-o1lo.onrender.com/api/anhkh/auth";

export const registerPost = async (formData) => {
  const { data } = await api.post("/register", formData);
  return data;
};
export const loginPost = async (formData) => {
  try {
    const { data } = await api.post("/login", formData);
    return data;
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      if (errors.email) toast.error(errors.email);
      if (errors.password) toast.error(errors.password);
    } else {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    }
    throw err;
  }
};
