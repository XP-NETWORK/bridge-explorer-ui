import { FC, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import logo from "../assets/img/logo.svg";
import { useToggle } from "../hooks/use-toggle";
import MenuIcon from "../assets/icons/menu.svg";
import useCheckMobileScreen from "../hooks/isMobile";

export const Navbar = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const menu = useRef<HTMLDivElement>(null);

  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    menu.current?.classList.toggle("hidden");
  }, [isMenuOpen]);

  return (
    <nav className="bg-white shadow-[0_2px_13px_0px_rgba(0,0,0,0.1)]">
      <Container className="relative flex-shrink  flex flex-col sm:flex-row gap-y-4 justify-between px-4 border-red-400">
        <div className="navLeft">
          <a href="/" className="max-w-fit">
            <img src={logo} alt="logo" height={60} width={192} />
          </a>
          <div className="mainnetDiv">
            <span className="pulse-button"></span>
            Mainnet
          </div>
        </div>
        <div
          ref={menu}
          className="absolute overflow-hidden sm:static right-4 shadow-[0_1px_15px_0px_#2F303214] sm:shadow-none bg-white top-20 z-40 rounded-xl sm:overflow-visible sm:rounded-0 flex sm:flex flex-col justify-between sm:flex-row gap-x-4"
        >
          {menu.current?.classList?.contains("hidden") && isMobile && (
            <div
              className="overlay"
              onClick={() => menu.current?.classList.toggle("hidden")}
            ></div>
          )}
          <a
            className="sm:flex p-4 w-full min-w-[14rem] z-20  hover:bg-slate-100 sm:min-w-fit sm:p-0 sm:hover:bg-white  text-[#030303] items-end font-medium text-[15px] sm:pb-2.5 max-w-fit sm:border-t-2 border-transparent"
            href="/"
            style={{ marginTop: "20px" }}
          >
            Explorer
          </a>
          {/* <NavItem to="/">Explorer</NavItem> */}
          <a
            className="sm:flex p-4 w-full min-w-[14rem] z-20  hover:bg-slate-100 sm:min-w-fit sm:p-0 sm:hover:bg-white  text-[#030303] items-end font-medium text-[15px] sm:pb-2.5 max-w-fit sm:border-t-2 border-transparent"
            href="https://bridge.xp.network/"
            target="_blank"
            style={{ marginTop: "20px" }}
          >
            Bridge
          </a>

          {false && (
            <NavItem to="/dashboard" className="">
              Dashboard
            </NavItem>
          )}
        </div>
        <button
          className="absolute right-4 top-7 sm:hidden"
          onClick={toggleMenu}
        >
          <img src={MenuIcon} alt="menu icon" />
        </button>
      </Container>
    </nav>
  );
};

const NavItem: FC<{ to: string; className?: string }> = ({
  children,
  to,
  className,
}) => {
  return (
    <NavLink
      className={`sm:flex p-4 w-full min-w-[14rem] z-20 sm:min-w-fit sm:p-0 sm:hover:bg-white  hover:bg-slate-100 text-[#030303] items-end font-medium sm:pb-2.5  text-[15px] max-w-fit  border-transparent ${className}`}
      to={to}
    >
      {children}
    </NavLink>
  );
};
