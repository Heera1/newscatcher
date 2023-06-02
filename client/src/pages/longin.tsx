import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../store/LoginState";
import { userArr } from "../util/arrayCollection";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { setIsLogin } = useLogin();

  const signin = () => {
    const user = userArr.find(
      (user) => user.email === userId && user.password === password
    );

    if (user === undefined) {
      alert("찾을 수 없는 사용자입니다.");
      return;
    }
    alert("로그인 완료!");
    setIsLogin(true);
    navigator("/");
    localStorage.setItem(
      "accessToken",
      `${process.env.REACT_APP_ACCESS_TOKEN}`
    );
    return user;
  };

  return (
    <div className="flex justify-center h-screen mt-36">
      <div className="flex w-[28rem] p-10 justify-center items-center border-4 border-red-500 bg-gray-200 h-72 rounded-2xl">
        <div className="inline-block">
          <div className="flex mb-4">
            <label className="login-text">ID</label>
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
            ></input>
          </div>
          <div className="flex mb-8">
            <label className="login-text">PASSWORD</label>
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
            ></input>
          </div>
          <button
            onClick={signin}
            className="w-full px-6 py-2 text-white login-text bg-slate-600 rounded-xl"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
