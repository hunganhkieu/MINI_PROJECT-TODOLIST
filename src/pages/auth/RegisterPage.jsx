import { zodResolver } from "@hookform/resolvers/zod";
// import { message } from "antd";
import Password from "antd/es/input/Password";
import React from "react";
import { useForm } from "react-hook-form";
import { registerPost } from "../../api/apiAuth";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const registerSchema = z
    .object({
      userName: z
        .string({ message: "Username phải là string" })
        .trim()
        .nonempty({ message: "Username ko được để trống" })
        .min(3, { message: "Username phải lớn hơn hoặc bằng 3 ký tự" })
        .max(30, { message: "Username tối đa 30 ký tự" }),
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
      confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
      agreeToTerms: z.boolean().refine((check) => check === true, {
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
  } = useForm({ resolver: zodResolver(registerSchema) });
  const nav = useNavigate();

  const submit = async (data) => {
    try {
      await registerPost({
        userName: data.userName,
        email: data.email,
        password: data.password,
      });
      // console.log(data);
      toast.success("Đăng ký thành công");
      reset();
      nav("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi");
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" {...register("userName")} />
          {errors.userName && <span>{errors.userName.message}</span>}
        </div>
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
          <label htmlFor="">Confirm password</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="">Đồng ý điều khoản</label>
          <input type="checkbox" {...register("agreeToTerms")} />
          {errors.agreeToTerms && <span>{errors.agreeToTerms.message}</span>}
        </div>

        <button>Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
