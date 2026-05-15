import { observer } from "mobx-react-lite";
import eventStore from "../../../stores/eventStore";
import { useState } from "react";
import authStore from "../../../stores/authstore";

import { apiUrl, authenticatedFetch } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const NewEvent = observer(() => {
    const [eventTitle, setEventTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [venue, setVenue] = useState<string>("");
    const [capacity, setCapacity] = useState<number>(100);
    const [ticketPrice, setTicketPrice] = useState<number>(0);
    const [error, setError] = useState<string>("")

    const [successResponse, setSuccessResponse] = useState<string>("")

    const navigate = useNavigate()

    const username = authStore.username;
    const userId = authStore.userId;
    const email = authStore.email;
    const phone = authStore.phone;

    let existingEvents = eventStore.organizerEvents;

    const createNewEvent = async() => {
        const newEvent = {
            id: existingEvents.length + 1,
            event_title: eventTitle,
            description: description,
            start_date: startDate,
            end_date: endDate,
            venue: venue,
            maximum_attendees: capacity,
            available_seats: capacity,
            ticket_details: [
                {
                    ticket_price: ticketPrice,
                },
            ],
            organizer_details: [
                {
                    organizer_id: Number(userId),
                    organizer_name: username,
                    organizer_email: email,
                    organizer_phone: phone,
                }
            ],
            total_bookings_count: 0,
            attendee_details: [],
            booking_cancelled_users: [],
            booking_pending_users: [],
            cancelled_bookings_count: 0,
            pending_bookings_count: 0,

        };
        try {
            const payloadRequest = {
                event_title: eventTitle,
                description: description,
                start_date: startDate,
                end_date: endDate,
                venue: venue,
                is_paid: ticketPrice>0? true:false,
                maximum_attendees: capacity,
                ticket_price: ticketPrice
            }
            const response = await authenticatedFetch(apiUrl("/event/create/"), {
                method: "POST",
                body: JSON.stringify(payloadRequest)
            });
            const data = await response.json();
            if (response.ok) {
                setError('')
                setSuccessResponse("Event created successfully")
                console.log("Event created successfully:", data);
                eventStore.addEvent(newEvent);
                setEventTitle("");
                setDescription("");
                setStartDate("");
                setEndDate("");
                setVenue("");
                setCapacity(100);
                setTicketPrice(0);
            } else {
                setSuccessResponse("")
                const message = data.message
                setError(message);
                console.error("Failed to create event:", data);
            }
        } catch (error) {
            setSuccessResponse("")
            const message = error instanceof Error ? error.message : "Something went wrong";
            setError(message);
            console.error("Error creating event:", error);
        }
    }
    const handleHomeNavigation = () => {
        navigate('/')
    }
    return (
        <div className="new-event-page">
            <div className="new-event-page-header">
                <h1>Create New Event</h1>
                <button className="back-to-dashboard-button" onClick={handleHomeNavigation}>Back to Dashboard</button>
            </div>
            <div className="new-event-form">
                <div className="form-group">
                    <label htmlFor="event-title">Event Title</label>
                    <input type="text" id="event-title" placeholder="Enter event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Enter event description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="start-date">Start Date</label>
                    <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="end-date">End Date</label>
                    <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <input type="text" id="venue" placeholder="Enter event venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Maximum Attendees</label>
                    <input type="number" id="capacity" placeholder="Enter maximum attendees" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} />
                </div>
                <div className="form-group">
                    <label htmlFor="ticket-price">Ticket Price</label>
                    <input type="number" id="ticket-price" placeholder="Enter ticket price" value={ticketPrice} onChange={(e) => setTicketPrice(parseFloat(e.target.value))} />
                </div>
                <button className="create-event-submit-button" onClick={createNewEvent}>Create Event</button>
                {successResponse && <p>{successResponse}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
})

export default NewEvent;