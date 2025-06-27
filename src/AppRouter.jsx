import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import Instructions from "./pages/Instructions";

const AppRouter = () => {
  return (
    <div class="h-auto md:h-screen bg-white bg-gradient-to-bl dark:from-slate-950 dark:to-black transition-all duration-1000">
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
