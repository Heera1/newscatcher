import { useState } from "react";
import { PaginationProps } from "../util/typeCollection";

export default function Pagenation({
  totalPage,
  curPage,
  setCurPage,
  pageCount,
}: PaginationProps) {
  const [pageGroup, setPageGroup] = useState(Math.ceil(curPage / pageCount));
  let lastPage = pageGroup * pageCount;
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }

  let firstPage = lastPage - (pageCount - 1);
  if (pageCount > lastPage) {
    firstPage = 1;
  }

  const pagination = () => {
    let arr = [];
    for (let i = firstPage; i <= lastPage; i++) {
      arr.push(
        <button
          key={i}
          className={`pagination-but ${i === curPage ? "bg-gray-500" : ""}`}
          onClick={() => setCurPage(i)}
        >
          {i}
        </button>
      );
    }
    return arr;
  };

  const minusPage = () => {
    if (curPage === firstPage) {
      setPageGroup(pageGroup - 1);
      setCurPage((pageGroup - 1) * 10);
      return;
    } else if (curPage !== firstPage) {
      setCurPage(curPage - 1);
      return;
    }
  };

  const plusPage = () => {
    if (curPage === lastPage) {
      setPageGroup(pageGroup + 1);
      setCurPage(curPage + 1);
      return;
    }
    if (curPage !== lastPage) {
      setCurPage(curPage + 1);
      return;
    }
  };

  return (
    <div className="flex">
      <button
        className="pagination-but"
        onClick={minusPage}
        disabled={curPage === 1}
      >
        &lt;
      </button>
      {pagination()}
      <p className="px-2">...</p>
      <button
        className={`pagination-but font-bold ${
          totalPage === curPage ? "bg-gray-500" : ""
        }`}
        onClick={() => setCurPage(totalPage)}
      >
        {totalPage}
      </button>
      <button
        className="pagination-but"
        onClick={plusPage}
        disabled={curPage === lastPage && curPage === totalPage}
      >
        &gt;
      </button>
    </div>
  );
}
