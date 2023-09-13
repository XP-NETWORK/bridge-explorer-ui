import ReactPaginate from "react-paginate";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const SearchPaginator = (props: any) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { totalTrx, pageNumber } = props;
  const nPages = Math.ceil(totalTrx / 50);
  const ctx = { isLoading: false };
  const disableCursor = false;

  const handleOffset = (e: any, place: string) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(loc.search);
    const offset = searchParams.get("offset");
    console.log({ offset });

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    switch (place) {
      case "first":
        params.set("offset", "0");
        break;
      case "last":
        params.set("offset", String(nPages - 1));
        break;
      case "next":
        params.set("offset", String((offset ? +offset : 0) + 1));
        break;
      case "back":
        params.set("offset", String((offset ? +offset : 0) - 1));
        break;
      default:
        break;
    }

    console.log(params.toString());
    navigate(`?` + params.toString());
  };

  return (
    <div className="paginatorWraper mt-3">
      <span>Transactions</span>

      <div className="paginatorInnerWrapper">
        <span>
          {50 * pageNumber + 1} -
          {totalTrx > 50 ? (pageNumber === nPages ? totalTrx : 50 * pageNumber + 50) : totalTrx} of{" "}
          {totalTrx}
        </span>

        <button
          onClick={(e) => handleOffset(e, "first")}
          className={`button buttonFirst ${ctx?.isLoading ? "nonactive" : ""}`}
        >
          First
        </button>

        <ReactPaginate
          breakLabel={
            <span>
              Page {pageNumber + 1} of {nPages}
            </span>
          }
          nextLabel={
            <div
              className={`paginationControlWraper  ${
                ctx?.isLoading ? "nonactive" : ""
              } ${disableCursor}`}
              onClick={(e) => handleOffset(e, "next")}
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
              onClick={(e) => handleOffset(e, "back")}
            >
              <img src={prev} />
            </div>
          }
        />
        <button
          onClick={(e) => handleOffset(e, "last")}
          className={`button buttonLast ${ctx?.isLoading ? "nonactive" : ""}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};
