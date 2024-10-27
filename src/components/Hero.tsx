import { motion } from "framer-motion";
import { fitflow_running } from "../assets";
import { styles } from "../styles";

export const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className={`${styles.padding} bg-hero-pattern bg-cover bg-no-repeat bg-center w-full h-screen relative`}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-0"></div>

      <div className="relative z-10 mt-10 flex flex-col-reverse md:flex-row justify-evenly items-center">
        {/* text section */}
        <div className="flex flex-col text-center md:text-left">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-[100px] md:text-[170px] font-bold leading-tight"
          >
            FitFlow
          </motion.h1>
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-lightSecondary text-[20px] md:text-[30px] font-light mb-6 md:mb-8"
          >
            ...
          </motion.h2>

          {/* call-to-action button */}
          <motion.button
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="px-8 py-3 bg-ascent text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>

        {/* image */}
        <motion.img
          src={fitflow_running}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="w-[250px] md:w-[500px] rounded-full object-cover shadow-lg"
          alt="Running person"
        />
      </div>
    </section>
  );
};
