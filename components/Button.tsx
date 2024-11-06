import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Props {
  label: string;
  callBack: () => void;
}

const Button = ({ label, callBack }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={callBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-[20rem] py-[0.8rem] rounded-[1.5rem] text-secondary text-[1.3rem] overflow-hidden ${
        isHovered ? "bg-white text-tartiary" : "text-white"
      } transition-colors duration-300 ease-in-out  ${
        isHovered ? "animate-vibrate" : ""
      }`}
    >
      <FaHeart
        className="absolute z-10 top-[0.2rem] left-[0.5rem]"
        color={isHovered ? "red" : "white"}
        size={25}
      />
      <FaHeart
        className="absolute z-10 bottom-[0.6rem] left-[5.3rem]"
        color={isHovered ? "red" : "white"}
        size={12}
      />
      <FaHeart
        className="absolute z-10 top-[0.4rem] right-[5.3rem]"
        color={isHovered ? "red" : "white"}
        size={13}
      />
      <FaHeart
        className="absolute z-10 bottom-[0.1rem] right-[7rem]"
        color={isHovered ? "red" : "white"}
        size={8}
      />
      <FaHeart
        className="absolute z-10 top-[1rem] right-[0.2rem]"
        color={isHovered ? "red" : "white"}
        size={20}
      />
      <span className="relative z-10 text-[1.3rem]">{label}</span>
      <span
        className={`absolute inset-0 bg-tartiary transition-all duration-700 ease-out
          ${isHovered ? "w-0" : "w-full"} h-full`}
      />
    </button>
  );
};

export default Button;
