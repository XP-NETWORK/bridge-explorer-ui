import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDown.css";
import { setEventsQueryStringType, setStatusFilter } from "../../store/global";

import completedIcon from "../../assets/icons/completed.svg";
import showAllIcon from "../../assets/icons/all.svg";

import failedIcon from "../../assets/icons/failed.svg";
import pendingIcon from "../../assets/icons/pending.svg";
import info from "../../assets/icons/info.svg";
import processing from "../../assets/icons/proccess.svg";
import { ReduxState } from "../../store";

export const StatusFilter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("Show All");
  const resetType = useSelector(
    (state: ReduxState) => state.global.resetStatusAndType
  );

  const handleSelect = (e: any) => {
    console.log(e);
    if (e === "Show All") {
      dispatch(setStatusFilter(""));
    } else if (e === "Processing") {
      dispatch(setStatusFilter("Failed"));
    } else if (e === "Pending") {
      dispatch(setStatusFilter("Pending"));
    } else {
      dispatch(setStatusFilter(e));
    }

    setValue(e);
  };

  useEffect(() => {
    setValue("Show All");
  }, [resetType]);

  const getTypeStyle = () => {
    switch (value) {
      case "Show All":
        return (
          <div className="flex min-w-[5rem] flex-nowrap space-x-1 ">
            {/* <img
              src={showAllIcon}
              className="aspect-square"
              alt="show all icon"
              width={16}
            /> */}
            <div>{value}</div>
          </div>
        );
        break;
      case "Completed":
        return (
          <div className="flex min-w-[5rem] flex-nowrap space-x-1 text-[#10B67A]">
            <img
              src={completedIcon}
              className="aspect-square"
              alt="completed icon"
              width={16}
            />
            <div>Completed</div>
          </div>
        );
        break;
      case "Pending":
        return (
          <div className="flex min-w-[5rem] space-x-1 text-[#C058FF]">
            <img src={pendingIcon} alt="pending icon" />
            <h1>Pending</h1>
          </div>
        );
        break;
      case "Processing":
        return (
          <div className="flex min-w-[5rem] space-x-1 text-[#10B67A] text-[#6D7A92] statusWrapper">
            <img src={processing} alt="failed icon" />
            <h1>Processing</h1>
          </div>
        );
        break;

      default:
        break;
    }
  };

  let titleType = getTypeStyle();

  let title = (
    <div className="nameWrapper typeBtnWidth">
      {titleType} <div className="arrow-down"></div>
    </div>
  );

  return (
    <div className="dropDownContainer">
      <div className="dropDownWrapper">
        <div className="dropDownTitle">
          <p> Status</p>
        </div>
        <div className="dropDown">
          <DropdownButton
            onSelect={handleSelect}
            id="dropdown-basic-button"
            title={title}
            size="sm"
            variant=""
          >
            <Dropdown.Item eventKey="Show All">
              {" "}
              <div className="flex min-w-[5rem] flex-nowrap space-x-1 ">
                <img
                  src={showAllIcon}
                  className="aspect-square"
                  alt="show all icon"
                  width={16}
                />
                <div>Show All</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="Completed">
              {" "}
              <div className="flex min-w-[5rem] flex-nowrap space-x-1 text-[#10B67A]">
                <img
                  src={completedIcon}
                  className="aspect-square"
                  alt="completed icon"
                  width={16}
                />
                <div>Completed</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="Pending">
              {" "}
              <div className="flex min-w-[5rem] space-x-1 text-[#C058FF]">
                <img src={pendingIcon} alt="pending icon" />
                <h1>Pending</h1>
              </div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="Processing">
              <div
                className="flex min-w-[5rem] space-x-1 text-[#10B67A] text-[#6D7A92] statusWrapper"
                style={{ marginLeft: "3px" }}
              >
                <img src={processing} alt="failed icon" />
                <h1>Processing</h1>
                {/* <span data-tip="Halted by the validators <br/>  Please be patient 💙">
                  <img src={info} alt="" />
                </span> */}
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
