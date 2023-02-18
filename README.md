# PBIS
Positiva Building Inspection Service

## TODO
- NextJs init - done
- Sendgrid (mailserver for mail send firebase extension) init - done
- Scheduler init - done
- Firebase init
  - db store - partially
  - auth - done
  - investigate email send on purchase success - done
  - firestore rules
- Stripe init - done
- Scheduler -> Stripe -> Firebase -> send email :: e2e
- Admin -> Scheduler -> Firebase :: e2e
- UX 

## Auth flow
- silenty login in user (predefined user, deets from .env), firestore rules will allow writes from auth user to Bookings and User collection
- customer now is able to write to firestore with booking collection and user collection info

## Customer Flow
- User hits site and is silently logged in with PBIS firebase auth account to allow write access to firestore and store customer journey from start to successful booking
- Customer selects booking type and uses calendar widget to book an available timeslot
  - Booking slot now unavailable
    - For next 30mins 
    - Permanent on successful booking or until cancelled by administrator
- Customer enters details
  - User and Booking record created in Firestore
- Customer pays for booking
  - On Success 
    - Payment processed by stripe
    - Firestore Booking collection record updated with success
    - Firestore email extension triggered by write to mail collection
      - Email sent to PBIS admin
      - Email send to customer
      - UI - success screen/msg
  - On Fail 
    - Record recorded by stripe
    - Firestore booking collection record updated with fail
    - UI - fail msg

## Admin Flow
- Login as PBIS admin
- Manage Bookings
  - Set available times
  - View bookings
  - Cancel bookings

## Developer Getting Started Guide
1. Create a .env.local file from the provided .env.local.tmpl and fill in the values. 
2. Run npm install
3. Run npm run dev 
4. Hit localhost:3000 in your browser
