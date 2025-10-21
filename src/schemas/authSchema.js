import z from "zod";

export const registerSchema = z
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

export const loginSchema = z.object({
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
