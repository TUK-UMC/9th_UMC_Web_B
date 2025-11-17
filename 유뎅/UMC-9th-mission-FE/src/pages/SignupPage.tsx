import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상입니다." })
      .max(20, { message: "비밀번호는 20자 이하입니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상입니다." })
      .max(20, { message: "비밀번호는 20자 이하입니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
    navigate("/login");
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + `/v1/auth/google/login`;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative flex justify-center items-center">
          <button className="absolute left-4" onClick={() => navigate("/")}>
            <ChevronLeft />
          </button>
          <h1 className="font-bold">회원가입</h1>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-mediun hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src={"/images/google.svg"}
              alt="Google Logo Image"
              className="w-8"
            />
            <span>구글 로그인</span>
          </div>
        </button>
        <input
          {...register("name")}
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.name ? "border-red-500 bg-red-200" : "border-[#ccc]"}`}
          type={"name"}
          placeholder={"이름"}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <input
          {...register("email")}
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.email ? "border-red-500 bg-red-200" : "border-[#ccc]"}`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

        <div className="relative">
          <input
            {...register("password")}
            name="password"
            className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
              ${
                errors?.password ? "border-red-500 bg-red-200" : "border-[#ccc]"
              }`}
            type={showPassword ? "text" : "password"}
            placeholder={"비밀번호"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}

        <div className="relative">
          <input
            {...register("passwordCheck")}
            name="passwordCheck"
            className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
              ${
                errors?.passwordCheck
                  ? "border-red-500 bg-red-200"
                  : "border-[#ccc]"
              }`}
            type={showPasswordCheck ? "text" : "password"}
            placeholder={"비밀번호 확인"}
          />
          <button
            type="button"
            onClick={() => setShowPasswordCheck((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPasswordCheck ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isValid}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-mediun hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
