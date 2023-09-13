import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";
import { IEvent } from "../ExplorerEvents";
import { AccountIdentifier } from "@dfinity/nns";
import { Principal } from "@dfinity/principal";

export const FromLink = ({ event }: { event: IEvent }) => {
    let hash = event.fromHash;
    if (event.fromChain === "28")
        hash = AccountIdentifier.fromPrincipal({
            principal: Principal.fromText(event.senderAddress),
        }).toHex();

    return <ExplorerLink hash={hash} chain={event.fromChain!} />;
};

export const ToLink = ({ event }: { event: IEvent }) => {
    let hash = event.toHash;
    if (event.toChain === "28" && event.targetAddress)
        hash = AccountIdentifier.fromPrincipal({
            principal: Principal.fromText(event.targetAddress),
        }).toHex();

    return <ExplorerLink hash={hash!} chain={event.toChain!} />;
};

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
