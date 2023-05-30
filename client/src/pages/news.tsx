import axios from "axios";
import React, { useEffect, useState } from "react";
import CardNews from "../component/CardNews";
import Header from "../component/Header";
import SearchBar from "../component/SearchBar";
import { useLocation } from "react-router-dom";
import ScrollLoader from "../component/ScrollLoader";
import { getNewsDataType } from "../util/typeCollection";

export default function NewsPage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasKeyword, setHasKeyword] = useState(false);
  const KeywordCheck = () => {
    if (location.state.keyword === null) {
      return setHasKeyword(false);
    } else {
      return setHasKeyword(true);
    }
  };

  const categoryArr = ["relevancy", "date", "rank"];
  const [category, setCategory] = useState("relevancy");
  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    console.log("value", value);
    setCategory(value);
  };

  const [newsData, setNewsData] = useState<getNewsDataType[]>([]);
  console.log(newsData);
  const [keyword, setKeyword] = useState(location.state.keyword);
  const date = "2023/05/20";
  // new Date().toLocaleDateString("en-US");
  const [contries, setContries] = useState("US");
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    KeywordCheck();

    const controller = new AbortController();
    const signal = controller.signal;
    if (keyword !== null) {
      const getData = async () => {
        try {
          const res = await axios.get(
            `https://api.newscatcherapi.com/v2/search?q=${keyword}&from=${date}&countries=${contries}&page_size=${12}&page=${offset}&sort_by=${category}`,
            {
              headers: {
                "x-api-key": `${process.env.REACT_APP_API_KEY}`,
              },
              signal,
            }
          );
          if (signal.aborted) return;
          console.log("axios 요청완료");
          console.log("데이터", res.data);
          setNewsData(res.data);
          setIsLoading(true);
          if (offset >= res.data.total_papes) {
            // 페이지네이션으로 만들어야함
          }
        } catch (err) {
          if (signal.aborted) return;
          console.error(err);
          setIsLoading(true);
        }
      };
      getData();
    }

    return () => {
      console.log("마운트 해제 및 axios 요청취소");
      controller.abort();
    };
  }, [keyword, category]);

  if (!isLoading) {
    return <ScrollLoader />;
  }

  return (
    <div className="container">
      <Header></Header>
      <div className="m-auto">
        <div className="flex items-center justify-center my-20">
          <SearchBar></SearchBar>
        </div>
        <div>
          <p className="text-2xl font-bold text-center">Contry</p>
          <div>
            {categoryArr &&
              categoryArr.map((item, idx) => (
                <button
                  key={idx}
                  className="p-2 m-2 mb-10 bg-gray-200 rounded-lg"
                  onClick={selectCategory}
                  value={item}
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
        <div>
          {hasKeyword && <CardNews news={(newsData as any).articles} />}
        </div>
      </div>
    </div>
  );
}
