import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";
import Cross from "../assets/icons/cross.svg";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/Events";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  // @ts-ignore
  const { setChainName } = useContext(EventsContext);

  useEffect(() => {
    setChainName(value);
  }, [value]);

  return (
    <Container className="mt-8">
      <form
        className="flex px-4 py-2 bg-white rounded shadow-[0_1px_15px_0px_#2F303214]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          //type="search"
          placeholder="Search address or name"
          className="flex-1 bg-transparent focus:outline-none "
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="clearWrapper" style={{display: value? 'flex': 'none'}}>
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
