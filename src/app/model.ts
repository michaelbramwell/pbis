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
	sunday: DaySettingsAndSlots | null;
	monday: DaySettingsAndSlots | null;
	tuesday: DaySettingsAndSlots | null;
	wednesday: DaySettingsAndSlots | null;
	thursday: DaySettingsAndSlots | null;
	friday: DaySettingsAndSlots | null;
	saturday: DaySettingsAndSlots | null;
};

export type DaySettingsAndSlots = {
	value: string;
	isDayExcluded: boolean;
	availability: AvailableTimeSlot[] | null;
};

export type AvailableTimeSlot = {
	from: string;
	to: string;
	index: number;
};

export type WeeklySettingsAction = {
	type: string;
	selectedDay: string;
	daySettings: DaySettingsAndSlots | null;
	timeSlot: AvailableTimeSlot | null;
};

export type OverrideSettings = {
	settings: OverrideSetting [];
};

export type OverrideSetting = {
	ticks: number | null;
	date: Date | null;
	availability: AvailableTimeSlot[] | null;
};

export type OverrideSettingsAction = OverrideSetting & {
	type: string;
};

export enum SettingsActionType {
	updateDay = "updateDay",
	updateTimeSlot = "updateTimeSlot",
	overrideDate = "overrideDay"
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
