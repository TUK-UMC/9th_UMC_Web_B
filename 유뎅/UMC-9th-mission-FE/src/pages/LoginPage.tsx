import { useNavigate, useSearchParams } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninImformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

export const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(redirect || "/", { replace: true });
    }
  }, [navigate, accessToken, redirect]);

  const { values, errors, touched, getInPutProps } =
    useForm<UserSigninImformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = () => {
    const currentRedirect = redirect || window.location.pathname;
    localStorage.setItem("pendingRedirect", currentRedirect);
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL +
      `/v1/auth/google/login?redirect=${currentRedirect}`;
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있다면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있다면 true

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative flex justify-center items-center mb-4">
          <button className="absolute left-4" onClick={() => navigate("/")}>
            <ChevronLeft />
          </button>
          <h1 className="font-bold text-xl">로그인</h1>
        </div>
        <button
          type="button"
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
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-30 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="flex px-6 font-medium text-gray-900 bg-white left-1/2">
            OR
          </span>
          <hr className="w-30 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <input
          {...getInPutProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
          type={"email"}
          placeholder={"이메일을 입력해주세요!"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInPutProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요!"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md text-lg font-mediun hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
