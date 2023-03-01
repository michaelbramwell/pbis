"use client"

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Booking, BookingType, PaymentStatus, StatusType } from "../app/model"

interface State {
    context: Booking,
    update: (booking: Booking) => void
}

const initialContext: Booking = {
    start: new Date(),
    end: new Date(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bookingType: BookingType.standard,
    status: StatusType.pending,
    paymentStatus: PaymentStatus.pending,
    cost: 0
};

const initialState: State = {
    context: initialContext,
    update: (booking: Booking) => {}
}

export const AppContext = createContext<State>(initialState);
export const useAppContext = () => useContext(AppContext)

export function AppState({ children }: any) {
    const [appState, setAppState] = useState<Booking>(initialContext);

    useEffect(() => {
        console.log("app state", appState)
    }, [appState])

    const state: State = {
        context: appState,
        update: (booking: Booking) => {
            setAppState(booking);
        }
    }

    return (
        <AppContext.Provider value={state}>{children}</AppContext.Provider>
    )
}