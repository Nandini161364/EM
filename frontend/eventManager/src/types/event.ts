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