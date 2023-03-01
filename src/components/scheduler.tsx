"use client";

import React from "react";
import { ScheduleMeeting, StartTimeEventEmit, timeSlotDifference } from "react-schedule-meeting";
import { useAppContext } from "../context/appState";

export default function Scheduler() {
  const { context, update } = useAppContext();

  function onStartTimeSelect(e: StartTimeEventEmit) {
    update({
        ...context,
        cost: 1000000
    })  
    console.log(e)
  }

  console.log("ctx in scheduler", context);

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

  return (
    <ScheduleMeeting
      borderRadius={10}
      primaryColor="#3f5b85"
      eventDurationInMinutes={60}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={(e) => onStartTimeSelect(e)}
    />
  );
}
