"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDatePlan } from "@/store/slices/datePlanBucketSlice";
import { appDatas } from "@/store/slices/appSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "@/components/Metadata";
import { config } from "@/config";

const DateTime = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { datePlanBucket } = useAppSelector(appDatas);

  useEffect(() => {
    if (
      typeof window !== "undefined" && // Ensures the code runs on the client
      (!datePlanBucket.placeIds.length ||
        !datePlanBucket.foodIds.length ||
        !datePlanBucket.drinkIds.length ||
        !datePlanBucket.dateTypeIds.length)
    ) {
      router.push("/choose/places");
    }
  }, []);

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    if (selectedDate) {
      dispatch(
        setDatePlan({
          ...datePlanBucket,
          dayToDate: dayjs(selectedDate).format("DD-MM-YYYY"),
        })
      );
    }
  };

  const handleTimeChange = (selectedTime: Date | null) => {
    setTime(selectedTime);
    if (selectedTime) {
      dispatch(
        setDatePlan({
          ...datePlanBucket,
          timeToDate: dayjs(selectedTime).format("hh:mm A"),
        })
      );
    }
  };

  const handleCreateDatePlan = async () => {
    setIsLoading(true);
    if (!datePlanBucket.dayToDate || !datePlanBucket.timeToDate) {
      return toast("Choose our moments, Pookie!", {
        position: "top-center",
      });
    }
    const response = await fetch(`${config.apiBaseUrl}/api/create-date-plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datePlanBucket),
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      router.push(`/our-special-day/${responseJson.data.datePlanId}`);
    } else {
      toast("Error Creating Date Plan", {
        position: "top-center",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-[3rem]">
      <Metadata title="Our Moments" />
      <ToastContainer />
      <h2 className="text-[2rem] text-tartiary text-center mt-[1.5rem]">
        Choose Our Moments
      </h2>
      <div className="flex justify-between items-center w-[30rem]">
        <DatePicker
          className="h-[3rem] pl-[1rem] rounded-[0.5rem] text-black outline-primary"
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select a date"
        />
        <DatePicker
          className="h-[3rem] pl-[1rem] rounded-[0.5rem] text-black outline-primary"
          selected={time}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          placeholderText="Select a time"
        />
      </div>
      <Button
        label={isLoading ? "Creating..." : "Create Our Date Plan"}
        callBack={handleCreateDatePlan}
      />
    </div>
  );
};

export default DateTime;
