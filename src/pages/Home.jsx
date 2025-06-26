import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <div className="text-white lg:flex justify-center items-center">
        <CategoryList />
        <Hero></Hero>
      </div>
    </div>
  );
};

export default Home;
