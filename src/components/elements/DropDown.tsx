import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDown.css";
import { setEventsQueryStringType } from "../../store/global";
import { ReduxState } from "../../store";

export const DropDown = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("All Types");
  const resetType = useSelector(
    (state: ReduxState) => state.global.resetStatusAndType
  );

  const handleSelect = (e: any) => {
    console.log(e);
    if (e === "All Types") dispatch(setEventsQueryStringType(undefined));
    else {
      dispatch(setEventsQueryStringType(e));
    }
    setValue(e);
  };

  useEffect(() => {
    setValue("All Types");
  }, [resetType]);

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
            title={value}
            size="sm"
            variant=""
          >
            <Dropdown.Item eventKey="All Types">All Types</Dropdown.Item>
            <Dropdown.Item eventKey="Transfer">Transfer</Dropdown.Item>
            <Dropdown.Item eventKey="Unfreeze">Unfreeze</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
