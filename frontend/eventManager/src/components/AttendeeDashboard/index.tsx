import "./index.css";
import eventStore from "../../stores/eventStore";

const AttendeeDashboard = () => {
  const events = eventStore.attendeeEvents;

  return (
    <div>
      <h1>Attendee Dashboard</h1>
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.event_title}</h2>
            <p>{event.description}</p>
            <p>Date: {event.start_date} to {event.end_date}</p>
            <p>Venue: {event.venue}</p>
            <p>Available Seats: {event.available_seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendeeDashboard;