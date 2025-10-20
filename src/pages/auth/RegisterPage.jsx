import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { registerPost } from "../../api/apiAuth";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const registerSchema = z
    .object({
      userName: z.string().nonempty("Username ko được để trống"),
      email: z
        .string()
        .nonempty("Email ko được để trống")
        .email("Email sai định dạng"),
      password: z.string().min(7, "Tối thiểu 7 ký tự"),
      confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
      agreeToTerms: z.boolean().refine((v) => v === true, {
        message: "Bạn phải đồng ý với điều khoản",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Mật khẩu nhập lại không khớp",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const nav = useNavigate();

  const submit = async (data) => {
    try {
      await registerPost({
        userName: data.userName,
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng ký thành công");
      reset();
      nav("/auth/login");
    } catch {
      toast.error("Lỗi");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Đăng ký tài khoản
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            {...register("userName")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("agreeToTerms")} />
          <label>Tôi đồng ý với điều khoản</label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
