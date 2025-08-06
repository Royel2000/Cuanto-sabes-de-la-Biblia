import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Antiguo Testamento", path: "/category/antiguo" },
  { name: "Nuevo Testamento", path: "/category/nuevo" },
  { name: "Nivel Experto", path: "/category/expert", color: "purple" },
  { name: "Una sola vida", path: "/category/conferencia", color: "red" },
  { name: "¿Cómo jugar?", path: "/howPlay" },
];

const playSound = (url) => {
  const audio = new Audio(url);
  audio.volume = 1;
  audio.play().catch((e) => console.log("Error al reproducir audio:", e));
};

const CategoryList = () => {
  return (
    <div>
      <motion.div
        className="md:flex md:flex-wrap justify-center text-xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.2, rotate: 3 }}
            whileTap={{ scale: 0.7 }}
          >
            <Link
              onMouseEnter={() => playSound("./assets/music/hover.mp3")}
              onClick={() => {
                playSound("./assets/music/click.mp3");
              }}
              to={cat.path}
              className="flex flex-col text-center  transition-all duration-1000"
            >
              <h1
                className={`font-semibold text-black bg-zinc-50 dark:text-stone-100 mt-2 p-3 shadow-2xl ${
                  cat.color === "red"
                    ? "dark:bg-red-600 dark:hover:bg-red-500 dark:hover:shadow-red-800 transition-all duration-1000"
                    : cat.color === "purple"
                    ? "dark:bg-purple-700 dark:hover:bg-purple-500 dark:hover:shadow-purple-700 transition-all duration-1000"
                    : "dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:hover:shadow-zinc-800 transition-all duration-1000"
                }`}
              >
                {cat.name}
              </h1>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-row justify-center mt-5"></div>
    </div>
  );
};

export default CategoryList;
