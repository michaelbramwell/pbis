"use client";

import firebaseClient from "@/components/firebaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import { Booking, BookingType, PaymentStatus, StatusType } from "../app/model";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { async } from "rxjs";

interface State {
  context: Booking;
  update: (booking: Booking) => void;
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
  cost: 0,
};

const db = getFirestore(firebaseClient);

const initialState: State = {
  context: initialContext,
  update: (booking: Booking) => {
    console.log("Initial update", booking);
  },
};

export const AppContext = createContext<State>(initialState);
export const useAppContext = () => useContext(AppContext);

export function AppState({ children }: any) {
  const [appState, setAppState] = useState<Booking>(initialContext);

  useEffect(() => {
    console.log("app state", appState);
  }, [appState]);

  const state: State = {
    context: appState,
    update: async (booking: Booking) => {
      setAppState(booking);
      await setDoc(doc(db, "bookings", "test"), booking, { merge: true });
      console.log("Booking state updated with", booking);
    },
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
