
import { truncate } from "../Details/helpers";
import { txExplorers } from "../../constants";
import {IEvent} from '../ExplorerEvents'


const ExplorerLink = ({ hash, chain  }: {hash:string, chain: string}) => {

    const splited = hash.split('-')

  return  (<a
    className="text-[#235EF5] text-xs"
    onClick={(e) => e.stopPropagation()}
    href={`${ txExplorers[chain]}/${hash}`}
  >
    {hash && chain && truncate(splited?.at(splited.length - 1), 15)}
  </a>)
};

export default ExplorerLink;
