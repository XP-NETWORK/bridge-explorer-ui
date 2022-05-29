import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";
import Cross from "../assets/icons/cross.svg";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/Events";
import { useCallback } from "react";

import { debounce } from "./Details/helpers";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  // @ts-ignore
  const { setChainName } = useContext(EventsContext);

  const debounced = useCallback(debounce(setChainName, 1000), []);

  useEffect(() => {
    debounced(value);
  }, [value]);

  return (
    <Container className="mt-6">
      <form
        className="flex max-w-[635px] leading-9 mx-auto px-4 py-2 bg-white rounded shadow-[0_1px_15px_0px_#2F303214]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          //type="search"
          placeholder="Search address or chain name"
          className="flex-1 bg-transparent focus:outline-none "
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div
          className="clearWrapper"
          style={{ display: value ? "flex" : "none" }}
        >
          <img
            src={Cross}
            alt="cross"
            width={12}
            className="searchIcon clearSearch"
            onClick={() => setValue("")}
          />
        </div>
        <img src={SearchIcon} alt="search" className="searchIcon" />
      </form>
    </Container>
  );
};
