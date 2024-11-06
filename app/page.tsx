"use client";

import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { fetchAppDatas } from "@/store/slices/appSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const App = () => {
  const router = useRouter();

  const words = "Would you like to go on a date with me?";
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
      },
    }),
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-[5rem]">
      <div className="flex justify-center">
        {letters.map((letter, i) => (
          <motion.h2
            key={i}
            variants={pullupVariant}
            initial="initial"
            animate="animate"
            custom={i}
            className="text-center font-boldMd text-[2rem] md:text-[3rem] text-tartiary tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]"
          >
            {letter === " " ? <span>&nbsp;</span> : letter}
          </motion.h2>
        ))}
      </div>
      <Button
        label="Yes"
        callBack={() => {
          router.push("/choose/places");
        }}
      />
    </div>
  );
};

export default App;
