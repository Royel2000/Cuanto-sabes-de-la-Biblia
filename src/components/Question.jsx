import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./graph.css";
import Comodin from "./Comodin";
import { motion, AnimatePresence } from "framer-motion";
const Question = ({
  filteredQuestion,
  questionFiltered,
  indexQuestion,
  setIndexQuestion,
  setActiveQuiz,
}) => {
  const [score, setScore] = useState(0);
  const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answerRandom, setAnswerRandom] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answerPercent, setAnswerPercent] = useState([]);
  const [activeResults, setActiveResults] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const [timeLeft, setTimeLeft] = useState(10);

  function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    const answers = [
      ...filteredQuestion.incorrect_answers,
      filteredQuestion.correct_answer,
    ];
    const percent = [...filteredQuestion.public];

    playSound("/assets/music/transition.mp3");
    setAnswerPercent(percent);
    setAnswers(answers);

    const shuffled = shuffle(answers);
    setAnswerRandom(shuffled);

    setTimeLeft(15); // reinicia el tiempo

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAnswered(true);
          setSelectAnswerIndex(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [filteredQuestion]);

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 1;
    audio.play().catch((e) => console.log("Error al reproducir audio:", e));
  };

  const checkAnswer = (answerText, index) => {
    if (answerText === filteredQuestion.correct_answer) {
      playSound("/assets/music/correct.mp3");
      setScore(score + 1);
      setCurrentStep((prev) => prev + 1);
    } else {
      playSound("/assets/music/wrong.mp3");
    }
    setSelectAnswerIndex(index);
    setAnswered(true);
  };

  const onNextQuestion = () => {
    playSound("/assets/music/next.mp3");
    setIndexQuestion(indexQuestion + 1);
    setSelectAnswerIndex(null);
    setAnswered(false);
  };

  const onReset = () => {
    setScore(0);
    setActiveQuiz(false);
    setIndexQuestion(0);
  };

  return (
    <>
      <div>
        <div className="md:flex justify-between">
          <Comodin
            className="transition-all"
            filteredQuestion={filteredQuestion}
            answers={answers}
          />
          <div>
            {activeResults ? (
              <div
                className="flex flex-col  justify-between shadow-xl rounded-xl border border-zinc-200 dark:border-zinc-800  backdrop-blur-xl
              dark:bg-zinc-800 dark:bg-opacity-[50%] md:w-[600px] md:h-[600px] p-10 dark:text-white transition-all duration-1000"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={` ${
                      (score / questionFiltered.length) * 100 <= 90
                        ? "/assets/video/gameover.gif"
                        : "/assets/video/Winner.gif"
                    } `}
                    alt=""
                  />
                </motion.div>
                <div className="flex flex-col gap-2 text-center text-lg font-bold ">
                  <span>Acertaste</span>
                  <span className="font-bold text-6xl bg-gradient-to-tl from-zinc-500 to-zinc-100 bg-clip-text delay-200 text-transparent">
                    {((score / questionFiltered.length) * 100).toFixed(0)} pt
                  </span>
                  ({score} de {questionFiltered.length})
                  <span>{score * 10} puntos</span>
                  <Link to={`/`}>
                    <button
                      className="dark:text-zinc-100 rounded-xl px-5 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-100 hover:text-black 
                      font-medium hover:shadow-zinc-100/50 dark:bg-zinc-600 shadow-xl transition-all"
                      onMouseEnter={() => playSound("/assets/music/hover.mp3")}
                      onClick={() => onReset()}
                    >
                      volver
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col mt-6 md:mt-0 justify-between shadow-xl rounded-xl border border-zinc-200 dark:border-zinc-800  backdrop-blur-xl
              dark:bg-zinc-800 dark:bg-opacity-[50%] md:w-[600px] md:h-[600px] p-10 dark:text-white transition-all duration-1000"
              >
                <div className="flex justify-between">
                  <p className="text-xl font-bold">
                    {indexQuestion + 1} / {questionFiltered.length}
                  </p>
                  <div className="flex gap-2">
                    <AnimatePresence mode="wait">
                      <p className="font-semibold">Dificultad: </p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={`font-bold hover:text-transparent hover:bg-gradient-to-br dark:hover:from-zinc-700 hover:from-zinc-100 dark:hover:to-zinc-50 hover:to-zinc-500 hover:bg-clip-text  transition-all duration-1000 ${
                          filteredQuestion.difficulty == "Medio"
                            ? "text-amber-400"
                            : filteredQuestion.difficulty == "Muy Dificil"
                            ? "text-purple-500"
                            : filteredQuestion.difficulty == "Dificil"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {filteredQuestion.difficulty}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="transition-all">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={indexQuestion}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-10">
                        <motion.div
                          initial={{ width: "100%" }}
                          animate={{ width: `${(timeLeft / 10) * 100}%` }}
                          transition={{ duration: 1, ease: "linear" }}
                          className={`h-full transition-all ${
                            timeLeft >= 5
                              ? "bg-green-500"
                              : timeLeft >= 2
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                      </div>
                      <h1 className={`text-[25px] text-center transition-all`}>
                        {filteredQuestion.question}
                      </h1>
                      <p>{filteredQuestion.info}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {answerRandom.map((answer, index) => (
                    <motion.button
                      transition={{ duration: 1, ease: "linear" }}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-5 rounded flex border hover:bg-zinc-300 border-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-700 dark:hover:shadow-zinc-950 
                      justify-center items-center hover:scale-105 transition-all ease-in duration-300 delay-75 ${
                        selectAnswerIndex !== null &&
                        index === selectAnswerIndex
                          ? answer === filteredQuestion.correct_answer
                            ? "bg-green-500"
                            : "bg-red-500"
                          : ""
                      }`}
                      onMouseEnter={() => playSound("/assets/music/hover.mp3")}
                      key={answer}
                      onClick={() => checkAnswer(answer, index)}
                      disabled={answered && selectAnswerIndex !== index}
                    >
                      <p className="font-bold text-center text-md">{answer}</p>
                    </motion.button>
                  ))}
                </div>
                {indexQuestion + 1 === questionFiltered.length ? (
                  <button
                    className="dark:bg-zinc-700 dark:text-zinc-300 rounded-xl md:px-10 py-2 hover:bg-zinc-400 dark:hover:bg-zinc-200 hover:text-black font-medium 
                    dark:hover:shadow-zinc-950 hover:shadow-zinc-500 shadow-xl md:flex md:justify-center transition ease-in-out duration-1000 delay-75 mt-4 md:mt-0"
                    onClick={() => {
                      playSound("/assets/music/click.mp3");
                      setAnswered(false);
                      setActiveResults(true);
                    }}
                  >
                    Finalizar
                  </button>
                ) : (
                  <button
                    className=" dark:bg-zinc-700 dark:text-zinc-300 rounded-xl px-10 py-2 text-center hover:bg-zinc-400 dark:hover:bg-zinc-200 hover:text-black font-medium 
                    dark:hover:shadow-zinc-950 hover:shadow-zinc-500 shadow-xl md:flex md:justify-between transition ease-in-out duration-1000 delay-75 mt-4 md:mt-0"
                    onClick={() => {
                      playSound("/assets/music/click.mp3");
                      onNextQuestion();
                    }}
                  >
                    <p>siguiente</p>
                    
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="dark:text-zinc-400 flex justify-between mt-10">
            {steps?.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  i + 1 < currentStep && "complete"
                }`}
              >
                <div className="step"></div>
                <p>{step * 10}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
