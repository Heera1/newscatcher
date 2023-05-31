import Header from "../component/Header";
import SearchBar from "../component/SearchBar";

export default function Home() {
  return (
    <div className="container">
      <Header></Header>
      <div className="h-screen">
        <div className="flex items-center justify-center">
          <div className="mt-56">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
