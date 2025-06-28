import React, { useState } from "react";
import Modal from "./Modal";
import ProgressLabel from "./ProgressLabel";
import { motion, AnimatePresence } from "framer-motion";

const Comodin = ({ filteredQuestion, answers }) => {
  const [activeType, setActiveType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (type) => {
    setActiveType(type);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveType(null);
  };

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 1;
    audio.play().catch((e) => console.log("Error al reproducir audio:", e));
  };

  const comodines = [
    {
      id: "50",
      label: "50 x 50",
      icon: "/assets/icons/g13.png",
      action: () => {
        handleOpen("cincuenta"), playSound("/assets/music/transition.mp3");
      },
    },
    {
      id: "bible",
      label: "Biblia",
      icon: "/assets/icons/bible.png",
      action: () => {handleOpen("biblia"), playSound("/assets/music/transition.mp3");},
    },
    {
      id: "public",
      label: "Público",
      icon: "/assets/icons/public.png",
      action: () => {handleOpen("publico"), playSound("/assets/music/transition.mp3");},
    },
  ];

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <motion.div
          className="flex justify-center transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center px-10 sm:py-2">
            <h3 className="text-lg sm:text-2xl md:text-4xl font-semibold dark:text-zinc-300">
              Comodín:{" "}
              {activeType === "biblia"
                ? "Biblia"
                : activeType === "cincuenta"
                ? "50%"
                : "Público"}
            </h3>

            <div className="sm:mt-4 dark:text-zinc-400 sm:text-xl md:text-3xl font-bold">
              {activeType === "biblia" && <p>{filteredQuestion.bible}</p>}

              {activeType === "cincuenta" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-center items-center transition-all">
                    {[
                      filteredQuestion.correct_answer,
                      filteredQuestion.incorrect_answers[0],
                    ].map((text, i) => (
                      <button
                        key={i}
                        className="p-5 m-2 shadow-lg rounded border dark:border-slate-800 dark:bg-slate-800 dark:bg-opacity-[30%]
                        dark:hover:bg-slate-700 hover:bg-slate-200 dark:hover:text-white transition-all ease-in-out duration-300 flex justify-center items-center"
                        onClick={() => checkAnswer(answer, index)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeType === "publico" && (
                <div className="w-60 sm:w-72 md:w-96 sm:my-3 transition-all">
                  {answers.map((answer, i) => (
                    <div key={i}>
                      <button className="p-5 justify-center w-full">
                        <p className="font-bold text-md">
                          {answer}
                        </p>
                      </button>
                      <ProgressLabel progress={filteredQuestion.public[i]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Modal>

      <div className="flex md:flex-col justify-center shadow-lg backdrop-blur-xl rounded-xl border dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-[30%] md:h-[600px] lg:h-[650px] mx-3 md:ml-5 lg:mx-5 p-10 dark:text-white transition-all duration-1000">
        {comodines.map((btn) => (
          <motion.button
            key={btn.id}
            className="hover:translate-x-3 transition-all duration-1000 font-semibold dark:text-slate-100 mt-2 p-3
              dark:hover:bg-slate-800 hover:bg-slate-100 rounded-xl flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={btn.action}
          >
            <div className="flex flex-col">
              <img src={btn.icon} className="max-h-20" alt={btn.label} />
              {btn.label}
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default Comodin;
