import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

interface Heart {
  id: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const Background: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newHearts: Heart[] = Array.from({ length: 13 }).map(() => ({
        id: uuidv4(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 5,
        duration: Math.random() * 20 + 20,
      }));
      setHearts(newHearts);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: heart.x, top: heart.y }}
          initial={{ y: "60vh", opacity: 0 }}
          animate={{
            y: `-${Math.random() * 100 + 100}vh`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Image
            alt="Heart Icon"
            src={"/heartIcon.png"}
            width={30}
            height={30}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Background;
