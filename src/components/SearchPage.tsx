import "../css/SearchPage.css";
import MapComp from "./MapComp";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

function SearchPage() {
  return (
    <>
      <MapComp />
      <SearchBar />
      <Sidebar />
    </>
  );
}

export default SearchPage;
