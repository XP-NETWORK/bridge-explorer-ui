import { Routes, Route } from "react-router-dom";
import { Explorer } from "./pages/Explorer";
import { Event } from "./pages/Event";
import { Dashboard } from "./pages/Dashboard";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Explorer />} />
      <Route path="/tx/:fromHash" element={<Event />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
