"use client";

import Button from "@/components/Button";
import CircularChoice from "@/components/CircularChoice";
import Metadata from "@/components/Metadata";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appDatas } from "@/store/slices/appSlice";
import { setDatePlan } from "@/store/slices/datePlanBucketSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TastyPicks = () => {
  const { foods, drinks, datePlanBucket } = useAppSelector(appDatas);

  const [activeTab, setActiveTab] = useState("foods");

  const [specialFoods, setSpecialFoods] = useState<any[]>([]);

  const [specialDrinks, setSpecialDrinks] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!datePlanBucket.placeIds.length) {
      router.push("/choose/places");
    }
  }, []);

  useEffect(() => {
    if (foods.length) {
      const foodsWithDelays = foods.map((food, index) => ({
        ...food,
        delay: index * 300,
      }));
      setSpecialFoods(foodsWithDelays);
    }
    if (drinks.length) {
      const drinksWithDelays = drinks.map((drink, index) => ({
        ...drink,
        delay: index * 300,
      }));
      setSpecialDrinks(drinksWithDelays);
    }
  }, [foods, drinks]);

  return (
    <div className="relative mb-[5rem]">
      <ToastContainer />
      <Metadata title="Tasty Picks" />
      <h2 className="text-[2rem] text-tartiary text-center mt-[1.5rem]">
        Our Tasty Picks
      </h2>
      {/* Tab Menu */}
      <div className="mt-[2.5rem]">
        <div className="relative flex justify-between items-center w-[15rem] mx-auto">
          <button
            className={`text-[1.5rem] text-tartiary font-boldMd mb-[0.3rem] ${
              activeTab === "foods" ? "" : ""
            }`}
            onClick={() => setActiveTab("foods")}
          >
            Foods
          </button>
          <button
            className={`text-[1.5rem] mb-[0.3rem] font-boldMd text-tartiary ${
              activeTab === "drinks" ? "" : ""
            }`}
            onClick={() => setActiveTab("drinks")}
          >
            Drinks
          </button>

          {/* Slider underline */}
          <div
            className={`absolute bottom-0 h-[0.2rem] bg-primary transition-all duration-300`}
            style={{
              width: "25%",
              borderRadius: "1rem",
              transform:
                activeTab === "foods" ? "translateX(0)" : "translateX(290%)",
            }}
          />
        </div>
      </div>
      {/* Datas */}
      <div className="mt-[3rem]">
        {activeTab === "foods" ? (
          <div className="flex justify-center items-center space-x-[4rem] mt-[2rem] flex-wrap">
            {specialFoods.map((food, index) => (
              <motion.button
                onClick={() => {
                  if (datePlanBucket?.foodIds?.includes(food.id)) {
                    dispatch(
                      setDatePlan({
                        ...datePlanBucket,
                        foodIds: datePlanBucket.foodIds.filter(
                          (foodId) => foodId !== food.id
                        ),
                      })
                    );
                  } else {
                    dispatch(
                      setDatePlan({
                        ...datePlanBucket,
                        foodIds: datePlanBucket.foodIds
                          ? [...datePlanBucket.foodIds, food.id]
                          : [food.id],
                      })
                    );
                  }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: parseFloat(food.delay) / 1000,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                key={food.id}
              >
                <CircularChoice
                  isSelected={
                    datePlanBucket?.foodIds?.includes(food.id) ? true : false
                  }
                  assetUrl={food.assetUrl}
                  name={food.name}
                />
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-[4rem] mt-[2rem] flex-wrap">
            {specialDrinks.map((drink, index) => (
              <motion.button
                onClick={() => {
                  if (datePlanBucket?.drinkIds?.includes(drink.id)) {
                    dispatch(
                      setDatePlan({
                        ...datePlanBucket,
                        drinkIds: datePlanBucket.drinkIds.filter(
                          (drinkId) => drinkId !== drink.id
                        ),
                      })
                    );
                  } else {
                    dispatch(
                      setDatePlan({
                        ...datePlanBucket,
                        drinkIds: datePlanBucket?.drinkIds
                          ? [...datePlanBucket.drinkIds, drink.id]
                          : [drink.id],
                      })
                    );
                  }
                }}
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
                  isSelected={
                    datePlanBucket?.drinkIds?.includes(drink.id) ? true : false
                  }
                  assetUrl={drink.assetUrl}
                  name={drink.name}
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button className="fixed bottom-[2rem]">
          <Button
            label="Continue"
            callBack={() => {
              if (
                !datePlanBucket.foodIds.length ||
                !datePlanBucket.drinkIds.length
              ) {
                toast("You have to choose both kinds of treats, Pookie!", {
                  position: "top-center",
                });
              } else {
                router.push("/choose/date-vibes");
              }
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default TastyPicks;
