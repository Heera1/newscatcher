import axios from "axios";

export const postLoginAPI = async (userId: string, password: string) => {
  try {
    const res = await axios.post(
      `https://codestates-news.com/login?id=${userId}&password=${password}`
    );
    return res;
  } catch (err: unknown) {
    return console.error(err);
  }
};

export const getNewsDataAPI = async (
  q: string,
  date: string,
  country: string,
  page_size: number,
  offset: number,
  sort: string,
  topic: string,
  signal: any
) => {
  try {
    const res = await axios.get(
      `https://api.newscatcherapi.com/v2/search?q=${q}&from=${date}&countries=${country}&page_size=${page_size}&page=${offset}&sort_by=${sort}&topic=${topic}`,
      {
        headers: {
          "x-api-key": `${process.env.REACT_APP_API_KEY}`,
        },
        signal,
      }
    );
    return res;
  } catch (err: unknown) {
    return console.error(err);
  }
};

export const getHeadlineDataAPI = async (
  country: string,
  page_size: number,
  offset: number,
  topic: string,
  signal: any
) => {
  try {
    const res = await axios.get(
      `https://api.newscatcherapi.com/v2/latest_headlines?countries=${country}&topic=${topic}&page_size=${page_size}&page=${offset}`,
      {
        headers: {
          "x-api-key": `${process.env.REACT_APP_API_KEY}`,
        },
        signal,
      }
    );
    return res;
  } catch (err: unknown) {
    return console.error(err);
  }
};
