import { FC } from "react";
import { ReactComponent as ExplorerCardBg } from "../assets/ExplorerCardBg.svg";
import { Loader } from "../components/elements/Loader";

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  fetching: boolean;
}

export const ExplorerCard: FC<Props> = ({
  title,
  subtitle,
  icon,
  fetching,
}) => {
  return (
    // <div className="shadow-[0_1px_15px_0px_#2F303214] relative overflow-hidden rounded-lg font-poppins bg-white w-full p-5 explorerCard ">
    //   <h1 className={`text-[22px] md:text-[2rem] font-medium `}>
    //     {!fetching ? title : <Loader />}
    //   </h1>
    //   <label className="rowLabelCard">
    //     <img
    //       className="select-none pointer-events-none"
    //       src={icon}
    //       alt="icon"
    //     />
    //     <h2 className="text-md font-medium">{subtitle}</h2>
    //   </label>
    //   <ExplorerCardBg className="absolute select-none pointer-events-none right-0 top-0 dotsImg" />
    // </div>
    <></>
  );
};
