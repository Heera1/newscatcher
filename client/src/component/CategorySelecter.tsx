import { useState } from "react";

export default function CategorySelecter({ arr }: any) {
  const [select, setSelect] = useState(arr[0]);
  const [spread, setSpread] = useState(false);

  const handleSpreadClick = (e: React.MouseEvent<HTMLElement>) => {
    setSpread(!spread);
  };
  const handleSpreadSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSpread(!spread);
    setSelect(e.currentTarget.value);
  };

  return (
    <div className="relative flex flex-col w-[6rem]">
      <button
        onClick={handleSpreadClick}
        className={`absolute flex w-[6rem] items-center justify-center h-10 px-4 pb-0.5 bg-white border rounded t-0 border-slate-200 ${
          spread && `rounded-b-none border-b-0`
        }`}
      >
        {select}
      </button>
      {spread && (
        <div
          onClick={handleSpreadClick}
          className="absolute z-30 w-full bg-white border top-10 rounded-b-xl drop-shadow-md "
        >
          {arr &&
            arr.map((item: any) => (
              <button
                key={item.select}
                onClick={handleSpreadSelect}
                value={item.id}
                className="flex items-center justify-center w-full px-4 pt-2 pb-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                {item.id}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
