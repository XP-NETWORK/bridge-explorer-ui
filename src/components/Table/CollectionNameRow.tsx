
import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";

export const CollectionNameRow = ({ collectionName, chain, hash }: { collectionName: string, chain: string, hash: string }) => {
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

