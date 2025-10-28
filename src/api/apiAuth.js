import { toast } from "react-toastify";
import api from ".";

// "https://api-class-o1lo.onrender.com/api/anhkh";

export const registerPost = async (formData) => {
  try {
    const { data } = await api.post("/auth/register", formData);
    return data;
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      if (errors.email) toast.error(errors.email);
    } else {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    }
    throw err;
  }
};
export const loginPost = async (formData) => {
  try {
    const { data } = await api.post("/auth/login", formData);
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
