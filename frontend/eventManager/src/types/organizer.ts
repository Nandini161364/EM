
interface Event {
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
}


export interface Organizer {
    organizer_id: number;
    organizer_name: string;
    organizer_email: string;
}


export interface Ticket {
    ticket_price: number;
}


export interface OrganizerDashboardProps {
    events: Event[];
}