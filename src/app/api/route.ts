import { PaymentIntent } from '@stripe/stripe-js'
import { NextResponse, NextRequest } from 'next/server'
import { BookingPaymentConfirmed, BookingType, PaymentStatus, StatusType } from '../model'

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const t = JSON.parse(json)    
    // we are looking for client_reference_id
    console.log(t)
    const paymentIntent: PaymentIntent = JSON.parse(json)    
    console.log(paymentIntent)
    const booking: BookingPaymentConfirmed = {
      id: "get the guid from stripe",
      status: StatusType.booked,
      paymentStatus: PaymentStatus.payed,
    };

    return NextResponse.json(json)
  } catch (e) {
    console.log(e)
    return new Response(null, {
      status: 400, statusText: "Bad request"
    })
  }
}
