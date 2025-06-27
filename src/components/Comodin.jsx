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
          <div className="text-center px-10 py-2">
            <h3 className="text-xl sm:text-2xl font-semibold dark:text-zinc-300">
              Comodín:{" "}
              {activeType === "biblia"
                ? "Biblia"
                : activeType === "cincuenta"
                ? "50%"
                : "Público"}
            </h3>

            <div className="sm:mt-4 dark:text-zinc-400 sm:text-xl font-normal">
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
                        className="p-5 m-2 shadow-lg rounded border dark:border-zinc-800 
                        dark:hover:bg-zinc-700 hover:bg-zinc-200 dark:hover:text-white transition-all ease-in-out duration-300 flex justify-center items-center"
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

      <div className="flex flex-col justify-center shadow-lg backdrop-blur rounded-xl border dark:border-zinc-800 dark:bg-zinc-800 dark:bg-opacity-[50%] md:h-[600px] p-10 dark:text-white transition-all duration-1000">
        {comodines.map((btn) => (
          <motion.button
            key={btn.id}
            className="hover:translate-x-3 transition-all duration-1000 font-semibold dark:text-stone-100 mt-2 p-3
              dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-xl flex items-center justify-center gap-2"
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
