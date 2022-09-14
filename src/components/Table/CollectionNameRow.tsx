import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";
import { useState } from "react";
import { IEvent } from "../ExplorerEvents";
import { setShowByCollection } from "../../store/global";
import { useDispatch } from "react-redux";

export const CollectionNameRow = ({
  collectionName,
  chain,
  hash,
}: {
  collectionName: string;
  chain: string;
  hash: string;
}) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const dispatch = useDispatch();
  const showCollection = (e: any) => {
    e.stopPropagation();
    //console.log("collectionName row", collectionName);

    a();
  };

  const a = () => {
    //console.log("collectionName a", collectionName);
    dispatch(setShowByCollection(collectionName));
    //console.log("collectionName a", collectionName);
  };
  return (
    <button
      className="text-[#235EF5] text-xs"
      onClick={(e) => showCollection(e)}
      //   href={`${txExplorers[chain]}${hash}`}
      //   target="_blank"
      //   rel="noreferrer"
    >
      {collectionName && truncate(collectionName, 15, undefined, "Last")}
    </button>
  );
};
