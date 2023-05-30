import { Link } from "react-router-dom";
import { CardNewsPropsType } from "../util/typeCollection";

export default function CardNews(news: CardNewsPropsType) {
  return (
    <div className="grid grid-cols-4 gap-4 m-auto">
      {news.news &&
        news.news.map((data: any, idx: number) => (
          <Link to={`${data.link}`} target="_blank">
            <div
              key={idx}
              className="bg-gray-200 border-2 border-gray-300 w-[18rem] h-[25rem] rounded-2xl mb-10 m-auto"
            >
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
            </div>
          </Link>
        ))}
    </div>
  );
}
