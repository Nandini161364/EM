import eventStore from "../../../stores/eventStore";
import { observer } from "mobx-react-lite";
import "./index.css";

const RecentEvents = observer(() => {
    const events = eventStore.organizerEvents;
    const latestEvents = events.filter(event => {
        const eventDate = new Date(event.start_date);
        const currentDate = new Date();
        return eventDate >= currentDate;
    });

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <div className="recent-events">
            <div className="recent-events-header">
                <span>Event Name</span>
                <span>Date</span>
                <span>Capacity</span>
                <span>Status</span>
                <span>Actions</span>
            </div>
            <div className="recent-events-list">
                {latestEvents.length > 0 ? (
                    latestEvents.map((event) => {
                        const bookedCount = event.total_bookings_count ?? event.maximum_attendees - event.available_seats;
                        const capacityPercentage = Math.min(
                            Math.round((bookedCount / event.maximum_attendees) * 100),
                            100
                        );
                        const isFull = bookedCount >= event.maximum_attendees;

                        return (
                        <div key={event.id} className="recent-event">
                            <h3>{event.event_title}</h3>
                            <p>{formatDate(event.start_date)}</p>
                            <div className="capacity-cell">
                                <div className="capacity-meta">
                                    <span>{bookedCount} / {event.maximum_attendees}</span>
                                    <span>{capacityPercentage}%</span>
                                </div>
                                <div className="capacity-track">
                                    <span style={{ width: `${capacityPercentage}%` }} />
                                </div>
                            </div>
                            <span className={`status-pill ${isFull ? "full" : "active"}`}>
                                {isFull ? "Full" : "Active"}
                            </span>
                            <button className="event-action-button">View</button>
                        </div>
                    )})
                ) : (
                    <p className="empty-events-message">No recent events to display.</p>
                )}
            </div>
        </div>
    );
});

export default RecentEvents;
