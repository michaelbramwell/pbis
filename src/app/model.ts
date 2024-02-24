export type Booking = {
  id: string;
  start: Date;
  end: Date;
  name: string;
  email: string;
  phone: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  bookingType: BookingType;
  status: StatusType;
  paymentStatus: PaymentStatus;
  cost: number;
};

export type BookingPaymentConfirmed = {
  id: string;
  status: StatusType;
  paymentStatus: PaymentStatus;
};

export type WeeklySettings = {
  sunday: DaySettings | null;
  monday: DaySettings | null;
  tuesday: DaySettings | null;
  wednesday: DaySettings | null;
  thursday: DaySettings | null;
  friday: DaySettings | null;
  saturday: DaySettings | null;
};

export type DaySettingsAndSlots = {
  value: string;
  isDayExcluded: boolean;
  availability: AvailableTimeSlot[] | null;
};

export type DaySettings = Omit<DaySettingsAndSlots, "availability">;

export type AvailableTimeSlot = {
  from: Date;
  to: Date;
};

export type WeeklySettingsAction = {
  type: string;
  selectedDay: string;
  daySettings: DaySettingsAndSlots | DaySettings | null;
};

export enum WeeklySettingsActionType {
  updateDay = "updateDay",
}

export enum BookingType {
  standard = "standard",
  large = "large",
}

export enum StatusType {
  booked = "booked",
  pending = "pending",
  canceled = "canceled",
}

export enum PaymentStatus {
  payed = "payed",
  declined = "declined",
  pending = "pending",
}

export const sessionTimeout: number = 30;
