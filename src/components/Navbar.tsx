import { FC, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import logo from "../assets/img/logo.svg";
import { useToggle } from "../hooks/use-toggle";
import MenuIcon from "../assets/icons/menu.svg";

export const Navbar = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menu.current?.classList.toggle("hidden");
  }, [isMenuOpen]);

  return (
    <nav className="bg-white shadow-md">
      <Container className="relative flex-shrink  flex flex-col sm:flex-row gap-y-4 justify-between px-4 border-red-400">
        <a target="_blank" href="https://xp.network" className="max-w-fit">
          <img src={logo} alt="logo" />
        </a>
        <div
          ref={menu}
          className="absolute overflow-hidden sm:static bg-white right-0  top-16 z-40 rounded-xl flex sm:flex flex-col justify-between sm:flex-row gap-x-4"
        >
          <NavItem to="/">Explorer</NavItem>
          <a
            className="sm:flex p-4 w-full min-w-[14rem] z-20  hover:bg-slate-100 sm:min-w-fit sm:p-0 sm:hover:bg-white  text-[#030303] items-end font-normal tracking-wide hover:tracking-[0.0175em] hover:font-medium text-[15px] sm:pb-2.5 max-w-fit sm:border-t-2 border-transparent"
            href="https://bridge.xp.network/"
            target="_blank"
          >
            Bridge
          </a>
          <NavItem to="/network">Network</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
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

const NavItem: FC<{ to: string }> = ({ children, to }) => {
  return (
    <NavLink
      className="sm:flex p-4 w-full min-w-[14rem] z-20 sm:min-w-fit sm:p-0 sm:hover:bg-white  hover:bg-slate-100 text-[#030303] items-end font-normal tracking-wide sm:pb-2.5  hover:tracking-[0.0175em] hover:font-medium text-[15px] max-w-fit sm:border-t-2 border-transparent"
      to={to}
    >
      {children}
    </NavLink>
  );
};
