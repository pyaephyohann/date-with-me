"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UnlockOurMoment = () => {
  const router = useRouter();
  const [heartSecret, setHeartSecret] = useState<string[]>([]);
  const [isHeartSecretCorrect, setIsHeartSecretCorrect] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (heartSecret.length === 6) {
      const passcode = heartSecret.join("");
      if (Number(passcode) === 159024) {
        router.push("/");
        localStorage.setItem("heartSecret", passcode);
      } else {
        setIsHeartSecretCorrect(false);
        setHeartSecret([]);
      }
    }
  }, [heartSecret, router]);

  const handleButtonClick = (label: string) => {
    setHeartSecret([...heartSecret, label]);

    setIsBlurred(true);

    setTimeout(() => {
      setIsBlurred(false);
    }, 600);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-[3rem] bg-[#f7f4d3] space-x-[2.5rem] flex border-primary border-solid border-[0.2rem] rounded-md">
        <Image
          className={`rounded-md transition duration-1000 ${
            isBlurred ? "opacity-15" : ""
          }`}
          alt="Couple"
          src={"/date.jpg"}
          width={300}
          height={300}
        />
        {/* Right Side */}
        <div>
          <h2 className="mb-[1.5rem] font-boldMd text-center">
            {heartSecret.length ? (
              <div className="flex justify-center gap-2">
                {heartSecret.map((item) => (
                  <div
                    className="w-[0.5rem] h-[0.5rem] bg-black rounded-full"
                    key={item}
                  ></div>
                ))}
              </div>
            ) : isHeartSecretCorrect ? (
              "Enter Heart Secret"
            ) : (
              "Oops! Wrong Heart Secret!"
            )}
          </h2>
          {/* Number Forms */}
          <div className="flex flex-wrap gap-4 justify-center items-center p-4 bg-[#f7f4d3] rounded-lg border-[0.2rem] border-solid border-primary w-[15rem]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "#"].map(
              (label, index) => (
                <button
                  onClick={() => handleButtonClick(label)}
                  key={index}
                  className="w-[3rem] h-[3rem] rounded-[0.8rem] border-primary border-[0.2rem] border-solid flex justify-center items-center bg-white text-black shadow-sm hover:bg-gray-100"
                >
                  <span>{label}</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockOurMoment;
