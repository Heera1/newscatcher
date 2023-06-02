export interface GetNewsDataType {
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
  summary?: string;
  rank?: number;
}

export interface CardNewsPropsType {
  data: ArticlesType[];
}

export interface UseIOProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export interface SelectCategoryButProps {
  arr: string[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  butClick: string;
}

export interface ResponseType {
  data: GetNewsDataType;
}

export interface PaginationProps {
  totalPage: number;
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
}
