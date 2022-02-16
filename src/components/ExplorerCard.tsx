import { FC } from "react";
import ExplorerCardBg from "../assets/ExplorerCardBg.svg";

interface Props {
  title: string;
  subtitle: string;
  icon: string;
}

export const ExplorerCard: FC<Props> = ({ title, subtitle, icon }) => {
  return (
    <div className="shadow-md relative overflow-hidden rounded-lg font-poppins bg-white w-full p-5">
      <img src={icon} alt="icon" />
      <h1 className="text-3xl font-medium mt-3">{title}</h1>
      <h2 className="text-md font-medium mt-2">{subtitle}</h2>
      <img className="absolute right-0 top-0" src={ExplorerCardBg} alt="" />
    </div>
  );
};
