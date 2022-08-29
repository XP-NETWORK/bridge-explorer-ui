import React from "react";
import ReactPaginate from "react-paginate";
import { withContainer } from "../../context/ServcieProvder";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";
import { useContext, useState, useEffect } from "react";
import { EventsContext } from "../../context/Events";
import { url } from "../../constants";
import { loadImages } from "../Details/helpers";
import CSVButton from "./CSVButton";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../store/global";
import { ReduxState } from "../../store";
import { usePrevious } from "../../hooks/previous";

export const Paginator = withContainer(
  ({
    container: {
      appData: { totalTx, totalWallets },
    },
  }) => {
    const disptach = useDispatch();
    const [disableCursor, setDisableCursor] = useState("");
    const ctx = useContext(EventsContext);

    const total = ctx?.totalEvents || 1;
    const { eventsQueryString, page, statusFilter } = useSelector((state: ReduxState) => ({
      page: state.global.page,
      eventsQueryString: state.global.eventsQueryString,
      statusFilter: state.global.statusFilter,
    })); //ctx?.paginationPage || 0;

    const previousQuery = usePrevious(eventsQueryString);
    const previousStatus = usePrevious(statusFilter);

    const onClickPage = async (idx: number) => {
      //console.log(idx);
      const newPage = page + idx < 0 ? 0 : page + idx <= Math.ceil(total / 50) ? page + idx : page;

      if (newPage + 1 === Math.ceil(total / 50) || newPage === total / 50) {
        setDisableCursor("paginate-disabled");
      } else {
        setDisableCursor("");
      }

      if (page !== newPage && newPage <= Math.ceil(total / 50)) {
        disptach(setPage(newPage));
        //ctx?.setPage(newPage);
      }
    };

    useEffect(() => {
      if (previousQuery === undefined || previousStatus === undefined) return;

      (previousQuery !== eventsQueryString || previousStatus !== statusFilter) &&
        disptach(setPage(0));
    }, [eventsQueryString, statusFilter]);

    return (
      <div className="paginatorWraper mt-3">
        <span>Transactions</span>
          {/* <CSVButton /> */}

          <div className="paginatorInnerWrapper">
            <span>
              {50 * page + 1} - {total > 50 ? 50 * page + 50 : total} of{" "}
              {ctx?.totalEvents || totalTx}
            </span>

            <button
              onClick={() => onClickPage(-page)}
              className={`button buttonFirst ${ctx?.isLoading ? "nonactive" : ""}`}
            >
              First
            </button>
            
            <ReactPaginate
              breakLabel={<span >Page {page + 1} of {Math.ceil(total / 50)}</span>}
              nextLabel={
                <div
                  className={`paginationControlWraper  ${
                    ctx?.isLoading ? "nonactive" : ""
                  } ${disableCursor}`}
                  onClick={() => onClickPage(1)}
                >
                  <img src={next} />
                </div>
              }
              onPageChange={() => {}}
              pageRangeDisplayed={0}
              pageCount={15}
              breakClassName={"paginatorLabel"}
              pageClassName="paginatorItem"
              previousLabel={
                <div
                  className={`paginationControlWraper ${
                    ctx?.isLoading ? "nonactive" : ""
                  }`}
                  onClick={() => onClickPage(-1)}
                >
                  <img src={prev} />
                </div>
              }
              //renderOnZeroPageCount={''}
            />
            <button
              onClick={() => onClickPage(Math.ceil(total / 50) - page - 1)}
              className={`button buttonLast ${ctx?.isLoading ? "nonactive" : ""}`}
            >
              Last
            </button>
          </div>
      </div>
    );
  }
);
