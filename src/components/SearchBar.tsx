import { Container } from "./Container";
import SearchIcon from "../assets/icons/search.svg";

export const SearchBar = () => {
  return (
    <Container className="mt-8">
      <form className="flex border px-4 py-2 bg-white rounded">
        <input
          type="search"
          placeholder="Search address or name"
          className="flex-1 bg-transparent focus:outline-none"
        />
        <img src={SearchIcon} alt="" />
      </form>
    </Container>
  );
};
