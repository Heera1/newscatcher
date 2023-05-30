import { useState } from "react";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../store/LoginState";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { setIsLogin } = useLogin();

  const LoginReq = () => {
    if (userId === "codestate1") {
      if (password === "12345678") {
        alert("로그인 완료");
        setIsLogin(true);
        navigator("/");
      }
    }
    if (userId === "codestate2") {
      if (password === "87654321") {
        alert("로그인 완료");
        setIsLogin(true);
        navigator("/");
      }
    }
  };
  return (
    <div className="container">
      <Header></Header>
      <div className="h-[30rem] flex justify-center items-center">
        <div className="flex w-1/3 bg-gray-200 h-72 rounded-2xl">
          <div className="inline-block m-auto">
            <div className="flex mb-4">
              <p className="w-[8rem] text-lg font-semibold">ID</p>
              <input
                type="text"
                id="id"
                name="id"
                minLength={5}
                maxLength={12}
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                className=""
              ></input>
            </div>
            <div className="flex mb-8">
              <p className="w-[8rem] text-lg font-semibold">PASSWORD</p>
              <input
                type="password"
                id="password"
                name="password"
                minLength={5}
                maxLength={12}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=""
              ></input>
            </div>
            <button
              onClick={LoginReq}
              className="w-full px-6 py-2 text-lg font-medium text-white bg-slate-600 rounded-xl"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
