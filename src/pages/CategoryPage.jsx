import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { questions } from "../data";
import Question from "../components/Question";
import LoadingBar from "../components/LoadingBar";
import { motion, AnimatePresence } from "framer-motion";

const shuffleArray = (array) => {
  const newArray = array.sort(() => Math.random() - 0.1);
  return newArray.slice(0, 10);
};

const CategoryPage = () => {
  const { category } = useParams();
  const [questionsFiltered, setQuestionsFiltered] = useState(
    questions.filter((question) => question.category === category)
  );
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const hoverSoundRef = useRef(null);

  useEffect(() => {
    const newQuestions = shuffleArray(questionsFiltered);
    setQuestionsFiltered(newQuestions);
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(() => {});
    }
  };

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 1;
    audio.play().catch((e) => console.log("Error al reproducir audio:", e));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeQuiz ? "quiz" : "inicio"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className="md:flex text-center justify-center"
      >
        {activeQuiz ? (
          <Question
            filteredQuestion={questionsFiltered[indexQuestion]}
            setIndexQuestion={setIndexQuestion}
            indexQuestion={indexQuestion}
            questionFiltered={questionsFiltered}
            setActiveQuiz={setActiveQuiz}
          />
        ) : (
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl text-zinc-700 dark:text-zinc-400 font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              ¿Listo?
            </motion.h1>

            <motion.img
              src="/assets/video/paccc.gif"
              alt="Listo"
              className="w-72 my-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />

            <audio
              ref={hoverSoundRef}
              src="/assets/music/hover.mp3"
              preload="auto"
            />

            <motion.button
              className={`text-5xl dark:text-white p-2 md:p-5 rounded lg:rounded-2xl font-bold transition-all ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-400 dark:hover:bg-slate-800 shadow-2xl dark:hover:shadow-slate-700 transition-all duration-500"
              }`}
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound("/assets/music/click.mp3");
                setLoading(true);
                setFadeOut(true);
                setTimeout(() => {
                  setActiveQuiz(true);
                  setFadeOut(false);
                }, 1000);
              }}
              onMouseEnter={playHoverSound}
              disabled={loading}
            >
              Empezar
            </motion.button>

            {loading && <LoadingBar />}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryPage;
