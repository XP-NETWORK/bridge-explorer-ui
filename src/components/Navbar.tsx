import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import logo from "../assets/img/logo.svg";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <Container className="items-stretch sm:flex justify-between px-4 border-red-400">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="sm:flex gap-x-4">
          <NavItem to="/">Bridige</NavItem>
          <NavItem to="/network">Network</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/explorer">Explorer</NavItem>
        </div>
      </Container>
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