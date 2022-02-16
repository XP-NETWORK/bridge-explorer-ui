import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/Events";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  // @ts-ignore
  const { setFromHash } = useContext(EventsContext);

  useEffect(() => {
    setFromHash(value);
  }, [value]);

  return (
    <Container className="mt-8">
      <form className="flex border px-4 py-2 bg-white rounded">
        <input
          type="search"
          placeholder="Search address or name"
          className="flex-1 bg-transparent focus:outline-none placeholder:text-sm"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <img src={SearchIcon} alt="" />
      </form>
    </Container>
  );
};
