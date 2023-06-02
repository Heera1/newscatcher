import { Link } from "react-router-dom";

import FavoriteImg from "../star.png";
import FavoriteDefalutImg from "../favorite.png";
import { useFavorite } from "../store/FavoriteState";

export default function CardNews(dataList: any) {
  const { selectData, setSelectData, click, setClick } = useFavorite();

  const handleClick = (
    e: React.MouseEvent<HTMLImageElement>,
    idx: number,
    data: any
  ) => {
    setSelectData([...selectData, data]);
    setClick(idx);
    alert("즐겨찾기에 추가되었습니다.");
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-auto">
      {dataList.data &&
        dataList.data.map((data: any, idx: number) => (
          <div
            key={idx}
            className="bg-gray-200 border-2 border-gray-300 h-[25rem] rounded-2xl mb-10 m-auto relative"
          >
            <img
              src={idx === click ? FavoriteImg : FavoriteDefalutImg}
              alt="즐겨찾기"
              width={30}
              onClick={(e) => handleClick(e, idx, data)}
              className="absolute cursor-pointer right-4 top-2"
            />
            <Link to={`${data.link}`} target="_blank">
              <img
                src={`${data.media}`}
                alt="news"
                referrerPolicy="no-referrer"
                className="w-full h-[12rem] rounded-t-xl"
              />
              <div className="p-4">
                <p className="mb-2 text-xl font-semibold line-clamp-1">
                  {data.title}
                </p>
                <p className="line-clamp-2">{data.summary}</p>

                <p>{data.author}</p>
                <p>{data.published_date}</p>
                <p className="line-clamp-1">{data.rights}</p>

                <p>{data.rank}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
