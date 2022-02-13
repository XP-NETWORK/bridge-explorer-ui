import { FC, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import logo from "../assets/img/logo.svg";
import { useToggle } from "../hooks/use-toggle";

export const Navbar = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menu.current?.classList.toggle("hidden");
  }, [isMenuOpen]);

  return (
    <nav className="bg-white shadow">
      <Container className="relative flex-shrink flex flex-col sm:flex-row gap-y-4 justify-between px-4 border-red-400">
        <Link to="/" className="max-w-fit">
          <img src={logo} alt="logo" />
        </Link>
        <div ref={menu} className="flex sm:flex flex-col sm:flex-row gap-x-4">
          <NavItem to="/">Bridge</NavItem>
          <NavItem to="/network">Network</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/explorer">Explorer</NavItem>
        </div>
        <button
          className="absolute right-4 top-7 sm:hidden"
          onClick={toggleMenu}
        >
          MENU
        </button>
      </Container>
    </nav>
  );
};

const NavItem: FC<{ to: string }> = ({ children, to }) => {
  return (
    <NavLink
      className="sm:flex items-end pb-2 max-w-fit sm:border-t-2 border-transparent"
      to={to}
    >
      {children}
    </NavLink>
  );
};
