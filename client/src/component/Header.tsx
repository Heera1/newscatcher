import React from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../store/LoginState";
import { loginArr, logoutArr } from "../util/arrayCollection";

export default function Header() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLogin();

  const goNavigate = (e: React.MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;

    if (id === "Main") {
      navigate("/");
      return;
    }
    if (id === "Login" || id === "Logout") {
      if (!isLogin) {
        navigate("/login");
        return;
      } else {
        alert("로그아웃 완료");
        setIsLogin(false);
        localStorage.removeItem("accessToken");
        navigate("/");
        return;
      }
    }
    if (id === "Headline") {
      navigate("/headline");
      return;
    }
    if (id === "Favorite") {
      navigate("/favorite");
      return;
    }
  };

  return (
    <div className="w-full p-8 mb-auto bg-gray-500 border-2">
      <ul className="flex justify-end text-2xl font-medium">
        {(isLogin ? logoutArr : loginArr).map((item: any) => (
          <li
            className="mr-10 cursor-pointer"
            onClick={goNavigate}
            id={item.id}
            key={item.id}
          >
            {item.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
