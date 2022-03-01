import { Routes, Route } from "react-router-dom";
import { Explorer } from "./pages/Explorer";
import { Event } from "./pages/Event";
import { Dashboard } from "./pages/Dashboard";
import {Network} from "./pages/Network";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Explorer />} />
      <Route path="/tx/:fromHash" element={<Event />} />
      <Route path="/network" element={<Network />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
