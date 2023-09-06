import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetURLSearchFilter } from "../../Services/GetURLSearchFilter";

import "./Searchbox.scss";

const Searchbox = ({ showSearch, isToggleable }) => {
  const [query, setQuery] = useState("");
  const [isSearchShown, setisSearchShown] = useState(showSearch);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  if (isToggleable) {
  }
  const toggleSearchbar = () => {
    setisSearchShown(!isSearchShown);
  };

  //Enables search as you type via use effect that fires every query change
  useEffect(() => {
    if (pathname != "/search" && !query) {
      return;
    }
    const link = GetURLSearchFilter(search, { query: query || "" });
    navigate(link);
  }, [query]);

  return (
    <div
      className={
        isSearchShown ? "my-search-container shown" : "my-search-container"
      }
    >
      <div className={isToggleable ? "icon-container" : ""}>
        <span
          onClick={isToggleable ? toggleSearchbar : undefined}
          className="material-symbols-outlined my-icon"
        >
          Search
        </span>
      </div>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..,"
        className={isSearchShown ? "my-search-input shown" : "my-search-input"}
      />
    </div>
  );
};

export default Searchbox;
