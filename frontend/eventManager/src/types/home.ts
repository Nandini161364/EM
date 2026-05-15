export type homeProps = {
    role: string;
}

export interface Organizer {
    organizer_id: number;
    organizer_name: string;
    organizer_email: string;
}

export interface Ticket {
    ticket_price: number;
}

export interface Attendee {
    attendee_id: number;
    attendee_name: string;
    attendee_email: string;
}

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
