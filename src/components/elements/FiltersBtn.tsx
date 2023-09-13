import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../assets/img/filter.svg";
import { ReduxState } from "../../store";
import { setFilterModal } from "../../store/global";

export default function FiltersBtn() {
  const dispatch = useDispatch();

  const openFilters = () => {
    dispatch(setFilterModal(true));
  };
  const show = () => {
    return (
    <div className="mobileOnly">
      <button
        className="bg-[#EEEEF2] text-[#222222] px-2 flex items-center space-x-1 p-1 hover:bg-[#235EF5] hover:text-white rounded "
        style={{ marginRight: "12px" }}
        onClick={openFilters}
      >
        <img src={filter} />
        <span>Filters</span>
      </button>
    </div>
   );
};

return show() || null;
};
