// {
//                     'id': event.id,
//                     'event_title': event.event_title,
//                     'description': event.description,
//                     'start_date': event.start_date,
//                     'end_date': event.end_date,
//                     'venue': event.venue,
//                     'maximum_attendees': event.maximum_attendees,
//                     'organizer_details': {
//                         'organizer_id': event.organizer.id,
//                         'organizer_email':event.organizer.email,
//                         'organizer_name': event.organizer.username,
//                     },
//                     'ticket_details': [
//                         {
//                             'ticket_price': ticket.price
//                         } for ticket in event.tickets.all()
//                     ],
//                     'available_seats': event.available_seats
//                 }

import { type Organizer } from "./organizer";

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


export interface Ticket {
    ticket_price: number;
}


export interface Attendee {
    attendee_id: number;
    attendee_name: string;
    attendee_email: string;
}


export interface AttendeeDashboardProps {
    events: Event[];
}
