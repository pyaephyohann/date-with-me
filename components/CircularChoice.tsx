import Image from "next/image";
import React from "react";

interface Props {
  assetUrl: string;
  name: string;
  isSelected?: boolean;
}

const CircularChoice = ({ name, assetUrl, isSelected }: Props) => {
  return (
    <div className="relative mb-[2rem] group">
      <Image
        className={`rounded-full mb-[1rem] transition-transform duration-300 transform group-hover:scale-110 ${
          isSelected ? "border-[0.5rem] border-primary border-solid" : ""
        }`}
        alt={name}
        src={assetUrl}
        width={200}
        height={200}
      />
      <h3 className="text-primary text-[1.4rem]">{name}</h3>
    </div>
  );
};

export default CircularChoice;
