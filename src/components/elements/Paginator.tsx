import React from "react";
import ReactPaginate from "react-paginate";

import { withContainer } from "../../context/ServcieProvder";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";
import { useContext, useState, useEffect } from "react";
import { EventsContext } from "../../context/Events";
import { url } from "../../constants";
import { loadImages } from "../Details/helpers";
import { CSVButton } from "./CSVButton";

export const Paginator = withContainer(
  ({
    container: {
      appData: { totalTx, totalWallets },
    },
  }) => {
    const ctx = useContext(EventsContext);

    const total = ctx?.totalEvents || totalTx;
    const page = ctx?.paginationPage || 0;

    const onClickPage = async (idx: number) => {
      //console.log(idx);
      const newPage =
        page + idx < 0
          ? 0
          : page + idx <= Math.ceil(total / 50)
          ? page + idx
          : page;

      if (page !== newPage) {
        ctx?.setPage(newPage);
      }
    };

    useEffect(() => {
      ctx?.setPage(0);
    }, [ctx?.chainName]);

    return (
      <div className="paginatorWraper">
        <span>
          Showing {50 * page + 1} - {50 * page + 50} out of {totalTx} Tx
        </span>
        <div className="leftWrapper">
          {/* <CSVButton /> */}
          <div className="paginatorInnerWrapper">
            <button onClick={() => onClickPage(-page)}>First</button>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <div
                  className="paginationControlWraper"
                  onClick={() => onClickPage(1)}
                >
                  <img src={next} />
                </div>
              }
              onPageChange={() => {}}
              pageRangeDisplayed={0}
              pageCount={Math.ceil(total / 50)}
              breakClassName={"paginatorItem"}
              pageClassName="paginatorItem"
              previousLabel={
                <div
                  className="paginationControlWraper prevControl"
                  onClick={() => onClickPage(-1)}
                >
                  <img src={prev} />
                </div>
              }
              //renderOnZeroPageCount={''}
            />
            <div className="paginatorLabel">
              Page {page + 1} of {Math.ceil(total / 50)}
            </div>
            <button
              onClick={() => onClickPage(Math.ceil(total / 50) - page - 1)}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    );
  }
);
