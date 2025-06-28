import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      className="flex p-5 justify-center"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 80,
        delay: 0.2,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.img
        src="/assets/images/portada.png"
        alt="Anuncio"
        className="lg:w-[70%] md:w-[50%] h-auto mb-10 md:mb-0 object-center rounded-xl cursor-grab active:cursor-grabbing"
        drag
        dragElastic={0.6} // resistencia al arrastre
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // límites (no dejar mover)
        whileTap={{ scale: 0.95 }}
        animate={{ x: 0, y: 0 }} // vuelve a su lugar
        transition={{ type: "spring", stiffness: 100 }}
      />
    </motion.div>
  );
};

export default Hero;
