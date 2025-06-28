import { motion, AnimatePresence, scale } from "framer-motion";
import TopButtons from "./TopButtons";

const Modal = ({ open, children, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Fondo oscuro con blur */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Contenedor del modal */}
          <motion.div
            className="relative z-10 overflow-hidden bg-zinc-100 dark:bg-slate-900 rounded-xl text-left shadow-2xl shadow-slate-900 border border-slate-800 dark:bg-opacity-[20%] backdrop-blur w-[90%] max-w-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Evita cierre si se hace clic dentro
          >
            <TopButtons />
            <div>{children}</div>
            <div className="bg-zinc-300 dark:bg-slate-800 dark:bg-opacity-[20%] backdrop-blur px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-[5px] dark:bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Salir
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
