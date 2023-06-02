import CardNews from "../component/CardNews";
import { useFavorite } from "../store/FavoriteState";

export default function Favorite() {
  const { selectData, setSelectData } = useFavorite();

  console.log("들어왔나?", selectData);
  return (
    <div className="h-screen p-4 mt-24">
      <CardNews data={selectData} />
    </div>
  );
}
