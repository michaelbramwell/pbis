export interface Booking {
    start: Date
    end: Date
    firstName: string
    lastName: string
    email: string
    phone: string
    bookingType: BookingType
    status: StatusType,
    paymentStatus: PaymentStatus,
    cost: number
}

export enum BookingType {
    standard = "standard",
    large = "large"
}

export enum StatusType {
    booked = "booked",
    pending = "pending",
    canceled = "canceled"
}

export enum PaymentStatus {
    payed = "payed",
    declined = "declined",
    pending = "pending"
}

export const sessionTimeout:number = 30 