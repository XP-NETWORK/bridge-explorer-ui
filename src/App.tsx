import { Routes, Route } from "react-router-dom";
import { Explorer } from "./pages/Explorer";
import { Event } from "./pages/Event";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Explorer />} />
      <Route path="/:fromHash" element={<Event />} />
    </Routes>
  );
};
