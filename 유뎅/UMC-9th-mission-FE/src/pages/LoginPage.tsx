import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { validateSignin, type UserSigninImformation } from "../utils/validate";

export const LoginPage = () => {
  const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
  const {values, errors, touched, getInPutProps} = useForm<UserSigninImformation>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  })

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      navigate("/");
    } catch(error) {
      alert(error?.message);
    }
    console.log(Response);
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled = 
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있다면 true
    Object.values(values).some(value => value === ""); // 입력값이 비어있다면 true

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative flex justify-center items-center">
          <button 
            className="absolute left-4"
            onClick={() => navigate("/")}>
              &lt;
            </button>
          <h1 className="font-bold">로그인</h1>
        </div>
        <input 
          {...getInPutProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-[#ccc]"}`}
          type={"email"} 
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input 
          {...getInPutProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-[#ccc]"}`}
          type={"password"} 
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isDisabled} 
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-mediun hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
          로그인
        </button>
      </div>
    </div>
  );
};
