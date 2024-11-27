import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  return <div></div>;
};

export default SearchBar;
