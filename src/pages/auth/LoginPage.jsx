import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { loginPost } from "../../api/apiAuth";
import { toast } from "react-toastify";

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
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập tài khoản
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              placeholder="Nhập email..."
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              placeholder="Nhập mật khẩu..."
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 gap-2">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 accent-indigo-500"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <Link
              to="/auth/register"
              className="text-indigo-600 hover:underline text-sm"
            >
              Đăng ký tài khoản
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
