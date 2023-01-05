import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";
import Cross from "../assets/icons/cross.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar: React.FC<{}> = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClearSearch = () => {
    setValue("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?bar=${value}`);
    console.log("onSubmit");
  };

  return (
    <Container className="mt-6">
      <form
        className="flex max-w-[635px] leading-9 mx-auto px-4 py-2 bg-white rounded shadow-[0_1px_15px_0px_#2F303214]"
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          placeholder="Search address or chain name"
          className="flex-1 bg-transparent focus:outline-none "
          onChange={handleChange}
          value={value}
        />
        <div className="clearWrapper" style={{ display: value ? "flex" : "none" }}>
          <img
            src={Cross}
            alt="cross"
            width={12}
            className="searchIcon clearSearch"
            onClick={handleClearSearch}
          />
        </div>
        <img src={SearchIcon} alt="search" className="searchIcon" />
      </form>
    </Container>
  );
};
