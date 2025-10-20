import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { loginPost } from "../../api/apiAuth";
import { toast } from "react-toastify";
// import { useForm, SubmitHandler } from "react-hook-form";
const LoginPage = () => {
  const loginSchema = z.object({
    email: z
      .string({ message: "Email phải là string" })
      .trim()
      .nonempty({ message: "Email ko được để trống" })
      .email("Phải đúng định dạng email"),
    password: z
      .string({ message: "Password phải là string" })
      .nonempty("Mật khẩu không được để trống")
      .min(7, "Mật khẩu phải có ít nhất 7 ký tự")
      .max(19, "Mật khẩu không được quá 19 ký tự"),
    rememberMe: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    try {
      setLoading(true);
      const res = await loginPost(data);
      // console.log(data);
      toast.success("Đăng nhập thành công");
      reset();
      const storage = data.rememberMe ? localStorage : sessionStorage;
      storage.setItem("auth", JSON.stringify(res));
      nav("/todos");
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        if (apiErrors.email) setError("email", { message: apiErrors.email });
        if (apiErrors.password)
          setError("password", { message: apiErrors.password });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      Cần đăng nhập để vào website
      <div>
        <form action="" onSubmit={handleSubmit(submit)}>
          <div>
            <label htmlFor="">Email</label>
            <input type="email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div>
            <label htmlFor="">Ghi nhớ đăng nhập</label>
            <input type="checkbox" {...register("rememberMe")} />
            {errors.rememberMe && <span>{errors.rememberMe.message}</span>}
          </div>

          <button disabled={loading}>
            {loading ? "Đang đăng nhập" : "Đăng nhập"}
          </button>
        </form>
      </div>
      <Link to="/auth/register">Đăng ký</Link>
    </div>
  );
};

export default LoginPage;
