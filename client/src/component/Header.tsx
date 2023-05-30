import React, { Children } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../store/LoginState";

export default function Header() {
  // 로그인 여부에 따라 다른 헤더 출력
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLogin();

  const goToMain = () => {
    navigate("/");
  };

  const goToHeadline = () => {
    navigate("/headline");
  };

  const goToFavorites = () => {
    navigate("/");
  };

  const handleClick = () => {
    if (!isLogin) {
      navigate("/login");
    }
    if (isLogin) {
      alert("로그아웃 완료");
      setIsLogin(false);
      navigate("/");
    }
  };

  return (
    <div className="w-full p-8 mb-auto bg-gray-500 border-2">
      <ul className="flex justify-end text-2xl font-medium">
        <li className="mr-10 cursor-pointer" onClick={goToMain}>
          Main
        </li>
        <li className="mr-10 cursor-pointer" onClick={handleClick}>
          {isLogin ? "Logout" : "Login"}
        </li>
        {isLogin && (
          <li className="mr-10" onClick={goToFavorites}>
            Favorites
          </li>
        )}
        <li className="mr-10" onClick={goToHeadline}>
          Headline
        </li>
      </ul>
    </div>
  );
}
