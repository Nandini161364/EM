// {
//     "event_title": "Concert",
//     "description": "Live Music",
//     "start_date": "2026-05-10T10:00:00Z",
//     "end_date": "2026-05-10T13:00:00Z",
//     "venue": "Hyderabad",
//     "is_paid": true,
//     "maximum_attendees": 100,
//     "ticket_price": 500
// }
import { type Organizer } from "./organizer";
import { type Attendee } from "./attendee";

export interface Event {
    id: number;
    event_title: string;
    description: string;
    start_date: string;
    end_date: string;
    venue: string;
    maximum_attendees: number;
    organizer_details: Organizer[];
    ticket_details: Ticket[];
    available_seats: number;
    attendee_details: Attendee[];
    booking_cancelled_users: Attendee[];
    booking_pending_users: Attendee[];
    total_bookings_count: number;
    cancelled_bookings_count: number;
    pending_bookings_count: number;
}

export type EventListComponentProps = {
    eventsList: Event[];
}

export interface CreateEvent {
    event_title: string
    description: string
    start_date: string
    end_date: string
    venue: string
    is_paid: boolean
    maximum_attendees: number
    ticket_price: number
}

export interface Ticket {
    ticket_price: number;
}
