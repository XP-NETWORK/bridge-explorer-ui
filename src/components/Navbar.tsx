import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.svg";

export const Navbar = () => {
  return (
    <nav>
      <div className="lg:max-w-4xl items-stretch mx-auto sm:flex justify-between px-4 border-red-400">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="sm:flex gap-x-4">
          <NavItem to="/">Bridige</NavItem>
          <NavItem to="/network">Network</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/explorer">Explorer</NavItem>
        </div>
      </div>
    </nav>
  );
};

const NavItem: FC<{ to: string }> = ({ children, to }) => {
  return (
    <NavLink className="sm:flex items-end pb-2 sm:border-t-2 " to={to}>
      {children}
    </NavLink>
  );
};
