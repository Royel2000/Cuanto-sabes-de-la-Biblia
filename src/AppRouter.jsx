import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import Instructions from "./pages/Instructions";

const AppRouter = () => {
  return (
    <div class="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/howPlay" element={<Instructions />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
