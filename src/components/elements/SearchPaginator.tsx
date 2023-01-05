import React from "react";
import ReactPaginate from "react-paginate";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchPaginator = (props: any) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { totalTrx, pageNumber, url } = props;
  const total = totalTrx / 50;
  const ctx = { isLoading: false };
  const disableCursor = false;

//   const handleFirst = async (page: any) => {
//     const searchParams = new URLSearchParams(loc.search);
//     const offset = searchParams.get("offset");
//     console.log({ offset });

//     var href = new URL(window.location.href);
//     var href2 = new URL(String(href.href));

//     href2.searchParams.set("offset", String((offset ? +offset : 0) + 1));
//     console.log(href2.toString());
//     navigate(href2.toString());
//   };
  const handleFirst = async (page: any) => {
    const searchParams = new URLSearchParams(loc.search);
    // searchParams.set("offset" , "sdfg");
   
  };

  return (
    <div className="paginatorWraper mt-3">
      <span>Transactions</span>

      <div className="paginatorInnerWrapper">
        <span>
          {50 * pageNumber + 1} - {total > 50 ? 50 * pageNumber + 50 : total} of {totalTrx}
        </span>

        <button
          onClick={handleFirst}
          className={`button buttonFirst ${ctx?.isLoading ? "nonactive" : ""}`}
        >
          First
        </button>

        <ReactPaginate
          breakLabel={
            <span>
              Page {pageNumber + 1} of {Math.ceil(total)}
            </span>
          }
          nextLabel={
            <div
              className={`paginationControlWraper  ${
                ctx?.isLoading ? "nonactive" : ""
              } ${disableCursor}`}
              onClick={() => handleFirst(1)}
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
              className={`paginationControlWraper ${ctx?.isLoading ? "nonactive" : ""}`}
              onClick={() => handleFirst(-1)}
            >
              <img src={prev} />
            </div>
          }
        />
        <button
          onClick={() => handleFirst(Math.ceil(total / 50) - pageNumber - 1)}
          className={`button buttonLast ${ctx?.isLoading ? "nonactive" : ""}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};
