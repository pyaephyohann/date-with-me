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

const Places = () => {
  const { places } = useAppSelector(appDatas);

  const [specialPlaces, setSpecialPlaces] = useState<any[]>([]);

  const datePlanBucket = useAppSelector(
    (state: RootState) => state.datePlanBucket.datePlan
  );

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (places.length) {
      const placesWithDelays = places.map((place, index) => ({
        ...place,
        delay: index * 300,
      }));
      setSpecialPlaces(placesWithDelays);
    }
  }, [places]);

  return (
    <div className="relative mb-[5rem]">
      <ToastContainer />
      <Metadata title="Special Places" />
      <h2 className="text-[2rem] text-tartiary text-center mt-[1.5rem]">
        Select Our Special Places
      </h2>
      <div className="flex justify-center items-center space-x-[4rem] mt-[3rem] flex-wrap">
        {specialPlaces.map((place, index) => (
          <motion.button
            onClick={() => {
              if (datePlanBucket?.placeIds?.includes(place.id)) {
                dispatch(
                  setDatePlan({
                    ...datePlanBucket,
                    placeIds: datePlanBucket.placeIds.filter(
                      (placeId) => placeId !== place.id
                    ),
                  })
                );
              } else {
                dispatch(
                  setDatePlan({
                    ...datePlanBucket,
                    placeIds: datePlanBucket?.placeIds
                      ? [...datePlanBucket.placeIds, place.id]
                      : [place.id],
                  })
                );
              }
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: parseFloat(place.delay) / 1000,
              duration: 0.5,
              ease: "easeOut",
            }}
            key={place.id}
          >
            <CircularChoice
              isSelected={
                datePlanBucket?.placeIds?.includes(place.id) ? true : false
              }
              assetUrl={place.assetUrl}
              name={place.name}
            />
          </motion.button>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="fixed bottom-[2rem]">
          <Button
            label="Continue"
            callBack={() => {
              if (!datePlanBucket.placeIds.length) {
                toast("Choose our date place, Pookie!", {
                  position: "top-center",
                });
              } else {
                router.push("/choose/tasty-picks");
              }
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Places;
