import ReactLoading from "react-loading";
export default function ScrollLoader() {
  return (
    <div className="flex items-center justify-center w-full mb-10 text-center h-3/4">
      <ReactLoading type="spin" color="black"></ReactLoading>
    </div>
  );
}
