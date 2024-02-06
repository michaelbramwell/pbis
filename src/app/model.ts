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
  sunday: DaySettings;
  monday: DaySettings;
  tuesday: DaySettings;
  wednesday: DaySettings;
  thursday: DaySettings;
  friday: DaySettings;
  saturday: DaySettings;
};

export type DaySettings = {
  value: string;
  isDayExcluded: boolean;
  availability: AvailableTimeSlot[];
};

export type AvailableTimeSlot = {
  from: Date;
  to: Date;
};

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
