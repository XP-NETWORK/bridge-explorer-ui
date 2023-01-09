import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDown.css";
import { ReduxState } from "../../store";
import { useNavigate } from "react-router-dom";

export const DropDown = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Show All");
  const resetType = useSelector((state: ReduxState) => state.global.resetStatusAndType);
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const handleSelect = (e: any) => {
    setValue(e);
    params.delete("bar");
    if (e === "Show All") {
      params.delete("type");
      navigate((String(url).includes("search") ? `?` : `search?`) + params.toString());
    } else {
      params.set("type", e);
      navigate((String(url).includes("search") ? `?` : `search?`) + params.toString());
    }
  };

  useEffect(() => {
    setValue("Show All");
  }, [resetType]);

  let title = (
    <div className="nameWrapper typeBtnWidth">
      {value} <div className="arrow-down"></div>
    </div>
  );
  return (
    <div className="dropDownContainer">
      <div className="dropDownWrapper">
        <div className="dropDownTitle">
          <p> Tx Type</p>
        </div>
        <div className="dropDown">
          <DropdownButton
            onSelect={handleSelect}
            id="dropdown-basic-button"
            title={title}
            size="sm"
            variant=""
          >
            <Dropdown.Item eventKey="Show All">Show All</Dropdown.Item>
            <Dropdown.Item eventKey="Transfer">Transfer</Dropdown.Item>
            <Dropdown.Item eventKey="Unfreeze">Unfreeze</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
