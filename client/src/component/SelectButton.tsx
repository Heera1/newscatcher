import { SelectCategoryButProps } from "../util/typeCollection";

export default function SelectButton({
  arr,
  onClick,
  id,
  butClick,
}: SelectCategoryButProps) {
  return (
    <div className="mt-0 headline-content">
      <div className="m-auto text-center">
        <p className="headline-text">{id}</p>
        <div>
          {arr &&
            arr.map((item, idx) => (
              <button
                key={idx}
                className={`p-2 m-2 mb-2 border-2 rounded-lg text-white ${
                  butClick === item
                    ? "font-semibold bg-blue-500 border-none"
                    : ""
                }`}
                onClick={onClick}
                value={item}
                id={id}
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
