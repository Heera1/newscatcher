import spinner from "../spinner.gif";

export default function ScrollLoader() {
  return (
    <div className="flex items-center justify-center w-full my-10 text-center h-3/4">
      <img src={spinner} alt="로딩중" width="5%" />
      <div>Loading...</div>
    </div>
  );
}
