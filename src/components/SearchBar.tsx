import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";
import Cross from "../assets/icons/cross.svg";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { debounce } from "./Details/helpers";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setEventsQueryString } from "../store/global";
import { useNavigate } from "react-router-dom";

export const SearchBar: React.FC<{
  mode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({mode}) => {
  const loc = useLocation();
  const [value, setValue] = useState(loc.pathname.replace("/", "") === "processing"? "" :loc.pathname.replace("/", "") );
 const navigate = useNavigate();
  const dispatch = useDispatch()

  const debounced = useCallback(debounce((value:string) => dispatch(setEventsQueryString(value)), 1000), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value === "" ?  mode(false) : mode(true)
    setValue(e.target.value);
    navigate(e.target.value);
  };

  const handleClearSearch = () => {
    mode(false)
    setValue("");
    navigate("");
  };

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
          onChange={handleChange}
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
            onClick={handleClearSearch}
          />
        </div>
        <img src={SearchIcon} alt="search" className="searchIcon" />
      </form>
    </Container>
  );
};
