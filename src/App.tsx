import { Routes, Route } from "react-router-dom";
import Explorer from "./pages/Explorer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Explorer />} />
    </Routes>
  );
};

export default App;
