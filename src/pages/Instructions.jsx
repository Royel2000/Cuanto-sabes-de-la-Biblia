import React from "react";
import { motion } from "framer-motion";
import TopButtons from "../components/TopButtons";

const Instructions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-10 mt-10">
        <div className="border border-zinc-900 rounded-xl bg-zinc-950 backdrop-blur-[20px] text-white shadow-2xl shadow-slate-900">
          <TopButtons />
          <div className="container">
            <div class="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
              <motion.h1
                className="text-transparent font-bold bg-gradient-to-br dark:from-zinc-700 from-zinc-100 dark:to-zinc-100 to-zinc-500 bg-clip-text text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                50x10 Bíblico.
              </motion.h1>
              <motion.p
                class="mt-6 text-lg text-zinc-400 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Un juego para probar todos tus conocimientos de la biblia
              </motion.p>
            </div>
            <div className="flex md:flex-col p-5 my-3">
              <motion.h1
                className="dark:text-stone-300 text-zinc-800 font-extrabold text-xl sm:text-2xl lg:text-4xl p-5 tracking-tight text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Instrucciones
              </motion.h1>
              <motion.div
                className="text-justify font-bold text-xl text-slate-500 mb-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h2 className="dark:text-slate-200 text-zinc-700">Preguntas</h2>
                <p>
                  15 preguntas a responder,
                  <br /> 4 respuestas por cada pregunta
                  <br /> de las cuales solo una es correcta
                </p>
                <h2 className="dark:text-slate-200 text-zinc-700">Comodines</h2>
                <p>
                  Los comodines son muy utiles <br /> en momentos en donde
                  necesitas reafirmar tus conocimientos
                </p>
                <h2 className="dark:text-slate-200 text-zinc-700">Puntaje</h2>
                <p>
                  Por cada pregunta que este repondida se multiplica 10 por el
                  numero de la pregunta
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Instructions;
