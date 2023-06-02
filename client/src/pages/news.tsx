import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardNews from "../component/CardNews";
import SearchBar from "../component/KeywordSearchBar";
import { useLocation } from "react-router-dom";
import ScrollLoader from "../component/ScrollLoader";
import { GetNewsDataType } from "../util/typeCollection";
import {
  countryArr,
  topicArr,
  sortArr,
  pagingArr,
} from "../util/arrayCollection";
import SelectButton from "../component/SelectButton";
import { getNewsDataAPI } from "../util/apiCollection";
import { AxiosResponse } from "axios";
import Pagenation from "../component/Pagenation";

export default function NewsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasKeyword, setHasKeyword] = useState(false);

  const KeywordCheck = () => {
    if (location.state.keyword !== null) {
      setHasKeyword(true);
      setKeyword(location.state.keyword);
      return;
    } else {
      setHasKeyword(false);
      alert("키워드를 입력하세요.");
      navigate("/");
      return;
    }
  };

  const [select, setSelect] = useState("15개씩");
  const [spread, setSpread] = useState(false);
  const handleSpreadClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); //이거 중단 왜 시키는 거지?
    setSpread(!spread);
  };
  const handleSpreadSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    select: number
  ) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setSpread(!spread);
    setSelect(value);
    setPageSize(select);
  };

  const [newsData, setNewsData] = useState<GetNewsDataType[]>([]);
  const [dataInfo, setDataInfo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [country, setCountry] = useState("US");
  const [topic, setTopic] = useState("news");
  const [sort, setSort] = useState("relevancy");
  const [offset, setOffset] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const date = "2023/05/20";

  useEffect(() => {
    KeywordCheck();

    const controller = new AbortController();
    const signal = controller.signal;
    if (keyword !== null) {
      const getData = async () => {
        try {
          const res = await getNewsDataAPI(
            keyword,
            date,
            country,
            pageSize,
            offset,
            sort,
            topic,
            signal
          );
          if (signal.aborted) return;
          const resData = (res as AxiosResponse<any, any>).data.articles;
          const resInfo = (res as AxiosResponse<any, any>).data.total_datas;
          console.log("news!!!!!!!!!", (res as AxiosResponse<any, any>).data);
          setDataInfo(resInfo);
          setNewsData(resData);
          setIsLoading(true); //이 부분 수정해야할 듯
        } catch (err: unknown) {
          if (signal.aborted) return;
          console.error(err);
          setIsLoading(true); // 이것도 수정 다른 곳으로 뺄 수 있을 거 같은데
        }
      };
      getData();
    }
    return () => {
      console.log("마운트 해제 및 axios 요청취소");
      controller.abort();
    };
  }, [sort, country, topic, pageSize, keyword, offset]);

  if (!isLoading) {
    return <ScrollLoader />;
  }

  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, id } = e.currentTarget;
    setNewsData([]);
    setOffset(1);
    if (id === "Country") {
      setCountry(value);
      return;
    } else if (id === "Topic") {
      setTopic(value);
      return;
    } else {
      setSort(value);
      return;
    }
  };

  return (
    <div className="p-4 ">
      <div className="">
        <div className="flex items-center justify-center my-20">
          <SearchBar />
          <div className="relative flex flex-col w-[6rem] my-auto ml-2">
            <button
              onClick={handleSpreadClick}
              className={`flex w-[6rem] items-center justify-center h-10 px-4 pb-0.5 bg-white border rounded t-0 border-slate-200 ${
                spread && `rounded-b-none border-b-0`
              }`}
            >
              {select}
              {spread ? <span> &#9651;</span> : <span> &#9661;</span>}
            </button>
            {spread && (
              <div
                onClick={handleSpreadClick}
                className="absolute z-30 w-full bg-white border top-10 rounded-b-xl drop-shadow-md "
              >
                {pagingArr.map((item) => (
                  <button
                    key={item.select}
                    onClick={(e) => handleSpreadSelect(e, item.select)}
                    value={item.id}
                    className="flex items-center justify-center w-full px-4 pt-2 pb-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex m-auto mb-20">
          <SelectButton
            arr={countryArr}
            onClick={selectCategory}
            id="Country"
            butClick={country}
          />
          <SelectButton
            arr={topicArr}
            onClick={selectCategory}
            id="Topic"
            butClick={topic}
          />
          <SelectButton
            arr={sortArr}
            onClick={selectCategory}
            id="Sort"
            butClick={sort}
          />
        </div>
        <div>{hasKeyword && <CardNews data={newsData} />}</div>
        <div className="flex items-center justify-center my-24">
          <Pagenation
            totalPage={dataInfo}
            curPage={offset}
            setCurPage={setOffset}
            pageCount={10}
          />
        </div>
      </div>
    </div>
  );
}
