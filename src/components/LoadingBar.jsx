import { motion } from "framer-motion";

const LoadingBar = () => {
  return (
    <div className="w-64 h-3 mt-6 bg-zinc-700 rounded overflow-hidden mx-auto">
      <motion.div
        className="h-full bg-red-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default LoadingBar;
