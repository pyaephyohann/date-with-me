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

const DateVibes = () => {
  const { dateTypes } = useAppSelector(appDatas);

  const [specialDateTypes, setSpeciallDateTypes] = useState<any[]>([]);

  const datePlanBucket = useAppSelector(
    (state: RootState) => state.datePlanBucket.datePlan
  );

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (
      !datePlanBucket.placeIds.length ||
      !datePlanBucket.foodIds.length ||
      !datePlanBucket.drinkIds.length
    ) {
      router.push("/choose/places");
    }
  }, []);

  useEffect(() => {
    if (dateTypes.length) {
      const dateTypesWithDelays = dateTypes.map((dateType, index) => ({
        ...dateType,
        delay: index * 300,
      }));
      setSpeciallDateTypes(dateTypesWithDelays);
    }
  }, [dateTypes]);

  return (
    <div className="relative mb-[5rem]">
      <ToastContainer />
      <Metadata title="Date Vibes" />
      <h2 className="text-[2rem] text-tartiary text-center mt-[1.5rem]">
        Pick Our Date Vibes
      </h2>
      <div className="flex justify-center items-center space-x-[4rem] mt-[3rem] flex-wrap">
        {specialDateTypes.map((dateType, index) => (
          <motion.button
            onClick={() => {
              if (datePlanBucket?.dateTypeIds?.includes(dateType.id)) {
                dispatch(
                  setDatePlan({
                    ...datePlanBucket,
                    dateTypeIds: datePlanBucket.dateTypeIds.filter(
                      (dateTypeId) => dateTypeId !== dateType.id
                    ),
                  })
                );
              } else {
                dispatch(
                  setDatePlan({
                    ...datePlanBucket,
                    dateTypeIds: datePlanBucket?.dateTypeIds
                      ? [...datePlanBucket.dateTypeIds, dateType.id]
                      : [dateType.id],
                  })
                );
              }
            }}
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
              isSelected={
                datePlanBucket?.dateTypeIds?.includes(dateType.id)
                  ? true
                  : false
              }
              assetUrl={dateType.assetUrl}
              name={dateType.name}
            />
          </motion.button>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="fixed bottom-[2rem]">
          <Button
            label="Continue"
            callBack={() => {
              if (!datePlanBucket.dateTypeIds.length) {
                toast("Choose our date vibe, Pookie!", {
                  position: "top-center",
                });
              } else {
                router.push("/choose/date-time");
              }
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default DateVibes;
