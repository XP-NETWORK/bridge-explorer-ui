import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";
import { IEvent } from "../ExplorerEvents";

const ExplorerLink = ({ hash, chain }: { hash: string; chain: string }) => {
    return (
        <a
            className="text-[#235EF5] text-xs"
            onClick={(e) => e.stopPropagation()}
            href={`${txExplorers[chain]}${hash}`}
            target="_blank"
            rel="noreferrer"
        >
            {hash && chain && truncate(hash, 15)}
        </a>
    );
};

export default ExplorerLink;
