import axios from "axios";
import { useEffect, useState } from "react";
import CardNews from "../component/CardNews";
import Header from "../component/Header";
import { useInView } from "react-intersection-observer";
import ScrollLoader from "../component/ScrollLoader";
import { getHeadlineType } from "../util/typeCollection";

export default function HeadlinePage() {
  const [newsData, setNewsData] = useState<getHeadlineType[]>([]);
  const [select, setSelect] = useState("US");
  const [topic, setTopic] = useState("news");

  const countryArr = ["KR", "JP", "GB", "CN", "US", "CA"];
  const topicArr = [
    "news",
    "sport",
    "tech",
    "world",
    "finance",
    "politics",
    "business",
    "economics",
    "entertainment",
    "beauty",
    "travel",
    "music",
    "food",
    "science",
    "gaming",
    "energy",
  ];

  const selectContry = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setSelect(value);
  };

  const selectTopic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setTopic(value);
  };

  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const [offset, setOffset] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=${select}&topic=${topic}&page_size=${12}&page=${offset}`,
        {
          headers: {
            "x-api-key": `${process.env.REACT_APP_API_KEY}`,
          },
          signal,
        }
      )
      .then((res) => {
        if (signal.aborted) return;
        setNewsData(res.data);
        setDataLoading(true);
        if (offset <= res.data.total_pages) {
          setHasNext(true);
          console.log("useE", offset);
        } else {
          setHasNext(false);
        }
      })
      .catch((err: unknown) => {
        if (signal.aborted) return;
        console.error(err);
        setDataLoading(true);
      });

    return () => {
      console.log("마운트 해체 및 axios 요청 취소");
      controller.abort();
    };
  }, [select, topic]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {}, 1000);
    }
  }, [inview]);

  if (!dataLoading) {
    return <ScrollLoader />;
  }

  return (
    <div className="container">
      <Header />
      <div className="m-auto">
        <div className="mt-10 headline-content">
          <div>
            <p className="text-2xl font-bold text-center">Contry</p>
            <div>
              {countryArr &&
                countryArr.map((item, idx) => (
                  <button
                    key={idx}
                    className="p-2 m-2 mb-10 bg-gray-200 rounded-lg"
                    onClick={selectContry}
                    value={item}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-10 headline-content">
          <div>
            <p className="text-2xl font-bold text-center">Topic</p>
            <div className="w-[46rem]">
              {topicArr &&
                topicArr.map((item, idx) => (
                  <button
                    key={idx}
                    className="p-2 mb-10 mr-2 bg-gray-200 rounded-lg"
                    onClick={selectTopic}
                    value={item}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div>
          <CardNews news={(newsData as any).articles} />
        </div>
      </div>
      <div ref={ref} className="flex justify-center p-8">
        {isLoading && <ScrollLoader />}
      </div>
    </div>
  );
}
