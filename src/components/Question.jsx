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
  let [score, setScore] = useState(0);
  const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answerRandom, setAnswerRandom] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answerPercent, setAnswerPercent] = useState([]);
  const [activeResults, setActiveResults] = useState(false);
  const [time, setTime] = useState(false);


  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  //? control de la visivilidad
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const answers = [
      ...filteredQuestion.incorrect_answers,
      filteredQuestion.correct_answer,
    ];
    const percent = [...filteredQuestion.public];

    playSound("/assets/music/transition.mp3");
    setAnswerPercent(percent);
    setAnswers(answers);
    setAnswerRandom(answers.sort(() => Math.random() - 0.1));
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
    setScore = 0;
    setActiveQuiz(false);
    setIndexQuestion = 0;
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
                className="flex flex-col justify-evenly items-center shadow-xl rounded-2xl md:w-[600px] h-full gap-5 bg-zinc-100
              dark:bg-black borderborder-zinc-100  dark:text-zinc-400 transition-all p-10 mt-2 sm:mt-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={` ${
                      (score / questionFiltered.length) * 100 <= 50
                        ? "/assets/video/gameover.gif"
                        : ""
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
                className="flex flex-col  justify-between shadow-xl rounded-xl border border-zinc-200 dark:border-zinc-900  backdrop-blur-xl
              dark:bg-zinc-950 dark:bg-opacity-[50%] md:w-[600px] md:h-[600px] p-10 dark:text-white transition-all duration-1000"
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-5 rounded flex border hover:bg-zinc-300 border-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-700 dark:hover:shadow-zinc-950 
                      justify-center items-center hover:scale-105 transition-all ease-in duration-300 delay-75 ${
                        selectAnswerIndex !== null &&
                        index === selectAnswerIndex
                          ? answer === filteredQuestion.correct_answer
                            ? "bg-green-500"
                            : `bg-red-500 ${setTimeout(() => {
                                setActiveResults(true);
                                setAnswered(false);
                              }, 4000)}`
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
                    dark:hover:shadow-zinc-950 hover:shadow-zinc-500 shadow-xl flex justify-center transition ease-in-out duration-1000 delay-75"
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
                    className=" dark:bg-zinc-700 dark:text-zinc-300 rounded-xl md:px-10 py-2 hover:bg-zinc-400 dark:hover:bg-zinc-200 hover:text-black font-medium 
                    dark:hover:shadow-zinc-950 hover:shadow-zinc-500 shadow-xl flex justify-between transition ease-in-out duration-1000 delay-75"
                    onClick={() => {
                      playSound("/assets/music/click.mp3");
                      onNextQuestion();
                    }}
                  >
                    siguiente{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="dark:text-white flex justify-between mt-10">
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
                <p>${step * 10}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
