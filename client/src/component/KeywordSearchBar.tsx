import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KeywordSearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (keyword.length >= 2) {
        navigate("/news", {
          state: { keyword },
        });
      } else {
        alert("검색어는 2글자 이상 입력해주세요.");
      }
    }
  };

  return (
    <form className="">
      <input
        type="search"
        className="w-[38rem] p-4 rounded-2xl text-black"
        id="search"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={(e) => onKeyPress(e)}
        minLength={2}
        maxLength={20}
        name="search"
      />
    </form>
  );
}
