"use client";

import React from "react";
import { ScheduleMeeting, StartTimeEventEmit } from "react-schedule-meeting";
import { useAppContext } from "../context/appState";
import { add } from 'date-fns'

export default function Scheduler() {
    const { context, update } = useAppContext();

    function onStartTimeSelect(e: StartTimeEventEmit) {
        const start = new Date(e.startTime)

        update({
            ...context,
            start: start,
            end: add(start, {
               hours: 3
            }),
            cost: 1000000
        })
    }

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
