
import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";
import { useState } from "react";
import { IEvent } from "../ExplorerEvents";

export const CollectionNameRow = ({ collectionName, chain, hash }: { collectionName: string, chain: string, hash: string }) => {
    const [events, setEvents] = useState<IEvent[]>([]);


    const showCollection = () =>{
        
    }
    return (
        <a
            className="text-[#235EF5] text-xs"
            onClick={(e) => e.stopPropagation()}
            href={`${txExplorers[chain]}${hash}`}
            target="_blank"
            rel="noreferrer"
        >
            {collectionName && truncate(collectionName, 15, undefined, "Last")}
        </a>
    );
};

