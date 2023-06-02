import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import CardNews from "../component/CardNews";
import ScrollLoader from "../component/ScrollLoader";
import { CardNewsPropsType } from "../util/typeCollection";
import useIntersectionObserver from "../util/useIO";
import { countryArr, topicArr } from "../util/arrayCollection";
import SelectButton from "../component/SelectButton";
import { getHeadlineDataAPI } from "../util/apiCollection";

export default function HeadlinePage() {
  const [newsData, setNewsData] = useState<CardNewsPropsType[]>([]);
  const [country, setCountry] = useState("US");
  const [topic, setTopic] = useState("news");

  const [offset, setOffset] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await getHeadlineDataAPI(country, 9, offset, topic, signal);
      if (signal.aborted) return;
      const resData = (res as AxiosResponse<any, any>).data.articles;
      setNewsData((prev) => prev.concat(resData));
      setDataLoading(true);
      setIsLoading(false);
      setOffset((prev) => prev + 1);
    } catch (err: unknown) {
      if (signal.aborted) return;
      console.error(err);
      setDataLoading(true);
    }
    return () => {
      console.log("마운트 해제 및 axios 요청취소");
      controller.abort();
    };
  };

  useEffect(() => {
    getData();
  }, [country, topic]);

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getData();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option 상태를 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0,
    onIntersect,
  });

  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, id } = e.currentTarget;
    setNewsData([]);
    setOffset(1);
    if (id === "Country") {
      setCountry(value);
    } else {
      setTopic(value);
    }
  };

  if (!dataLoading) {
    return <ScrollLoader />;
  }

  return (
    <div className="p-4">
      <div className="flex m-auto mt-10 mb-20">
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
      </div>
      <div>
        <CardNews data={newsData} />
      </div>
      {dataLoading && (
        <div
          ref={setTarget}
          className="flex p-10 mt-auto border-4 border-red-400"
        >
          {isLoading && <ScrollLoader />}
        </div>
      )}
    </div>
  );
}
