import axios from "axios";

// 헤더라인 get 요청
export const getHeadline = async () => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  try {
    const req = await axios.get(
      `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business`,
      {
        headers: {
          "x-api-key": "ec_H0WtBQQgVUchEdfjWcSMtPccm8hHdFwt_AZ0R_VE",
        },
        // signal,
      }
    );
    return req;
  } catch (err: unknown) {
    return console.error(err);
  }
};
