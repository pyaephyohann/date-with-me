"use client";

import Metadata from "@/components/Metadata";
import { config } from "@/config";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import Image from "next/image";
import CircularChoice from "@/components/CircularChoice";
import { motion } from "framer-motion";
import { BiCopy } from "react-icons/bi";

const OurSpecialDay = () => {
  const params = useParams();
  const id = params.datePlanId;

  const [isLoading, setIsLoading] = useState(false);

  const [datePlan, setDatePlan] = useState<any>({
    dayToDate: "",
    timeToDate: "",
    places: [],
    foods: [],
    drinks: [],
    dateTypes: [],
  });

  const handleGetDatePlan = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${config.apiBaseUrl}/api/get-date-plan/${id}`
    );
    const responseJson = await response.json();
    if (responseJson.success) {
      setDatePlan(responseJson.datePlan);
    } else {
      toast("Error Showing Date Plan", {
        position: "top-center",
      });
    }
    setIsLoading(false);
  };

  const textRef = useRef<HTMLInputElement | null>(null);

  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      toast("Link copied just for us 💕", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    handleGetDatePlan();
  }, [id]);

  return (
    <div className="relative">
      <Metadata title="Our Special Day" />
      <ToastContainer />
      <h2 className="text-[2rem] font-boldMd text-tartiary text-center mt-[2rem]">
        Exicted To Be With You
      </h2>
      <div className="flex justify-center mt-[2rem]">
        <Image
          alt="Cute Sticker"
          src="https://media.tenor.com/oGpz_hpmmTQAAAAj/cute.gif"
          width={300}
          height={300}
        />
      </div>
      <div className="ml-[5rem] mt-[3rem]">
        {/* Places */}
        <div>
          <h3 className="text-[1.5rem] text-tartiary font-boldMd">
            Our Special Place{datePlan.places.length > 1 ? "s" : ""}
          </h3>
          {isLoading ? (
            <ReactLoading
              className="mx-auto mt-[2rem]"
              type="spin"
              color="hotpink"
              height={50}
              width={50}
            />
          ) : (
            <div className="flex space-x-[4rem] ml-[3rem] mt-[2rem] flex-wrap">
              {datePlan.places.map((place: any) => (
                <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: parseFloat(place.delay) / 1000,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  key={place.id}
                >
                  <CircularChoice assetUrl={place.assetUrl} name={place.name} />
                </motion.button>
              ))}
            </div>
          )}
        </div>
        {/* Foods And Drinks */}
        <div className="mt-[1.5rem]">
          <h3 className="text-[1.5rem] mb-[1.5rem] text-tartiary font-boldMd">
            Our Tasty Picks
          </h3>
          <div>
            <h3 className="text-[1.3rem] font-boldMd text-tartiary">Foods</h3>
            {isLoading ? (
              <ReactLoading
                className="mx-auto mt-[2rem]"
                type="spin"
                color="hotpink"
                height={50}
                width={50}
              />
            ) : (
              <div className="flex space-x-[4rem] ml-[3rem] mt-[1.3rem] flex-wrap">
                {datePlan.foods.map((food: any) => (
                  <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: parseFloat(food.delay) / 1000,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    key={food.id}
                  >
                    <CircularChoice assetUrl={food.assetUrl} name={food.name} />
                  </motion.button>
                ))}
              </div>
            )}
            <h3 className="text-[1.3rem] font-boldMd text-tartiary">Drinks</h3>
            {/* Drinks */}
            {isLoading ? (
              <ReactLoading
                className="mx-auto mt-[2rem]"
                type="spin"
                color="hotpink"
                height={50}
                width={50}
              />
            ) : (
              <div className="flex space-x-[4rem] ml-[3rem] mt-[1.3rem] flex-wrap">
                {datePlan.drinks.map((drink: any) => (
                  <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: parseFloat(drink.delay) / 1000,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    key={drink.id}
                  >
                    <CircularChoice
                      assetUrl={drink.assetUrl}
                      name={drink.name}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Date Types */}
        <div className="mt-[1.5rem]">
          <h3 className="text-[1.5rem] text-tartiary font-boldMd">
            Our Date Vibe{datePlan.dateTypes.length > 1 ? "s" : ""}
          </h3>
          {isLoading ? (
            <ReactLoading
              className="mx-auto mt-[2rem]"
              type="spin"
              color="hotpink"
              height={50}
              width={50}
            />
          ) : (
            <div className="flex space-x-[4rem] ml-[3rem] mt-[2rem] flex-wrap">
              {datePlan.dateTypes.map((dateType: any) => (
                <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: parseFloat(dateType.delay) / 1000,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  key={dateType.id}
                >
                  <CircularChoice
                    assetUrl={dateType.assetUrl}
                    name={dateType.name}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
        {/* date */}
        <div className="mt-[1.5rem]">
          <h2 className="text-center text-[2.5rem] text-tartiary">
            See you Soon! 💗
          </h2>
          <h4 className="text-center text-[2rem] text-tartiary mt-[1.3rem] mb-[3rem]">
            Don&apos;t forget on {datePlan.dayToDate} at {datePlan.timeToDate}
          </h4>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={`http://localhost:3000/our-special-day/${id}`}
          ref={textRef}
          readOnly
          style={{ position: "absolute", left: "-999rem" }}
        />
        <button
          onClick={handleCopyClick}
          className="fixed right-[5rem] bottom-[2.5rem] p-[1.3rem] bg-secondary border-primary border-[0.2rem] border-solid rounded-full"
        >
          <BiCopy className="text-tartiary text-[1.5rem]" />
        </button>
      </div>
    </div>
  );
};

export default OurSpecialDay;
