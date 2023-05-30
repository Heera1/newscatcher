export interface getNewsDataType {
  articles: ArticlesType[];
  page: number;
  page_size: number;
  status: string;
  total_hits: number;
  total_pages: number;
}

export interface ArticlesType {
  title: string;
  author: string;
  published_date: string;
  rights: string;
  media: string;
  summary: string;
  rank: number;
}

export interface CardNewsPropsType {
  news: [
    title: string,
    author: string,
    published_date: string,
    rights: string,
    media: string,
    summary: string,
    rank: number
  ];
}

export interface getHeadlineType {
  news: [
    articles: [
      title: string,
      author: string,
      published_date: string,
      rights: string,
      media: string
    ]
  ];
}
