import eventStore from "../../../stores/eventStore";

const OrganizerEvents = () => {
    const events = eventStore.organizerEvents;
    
    return (
        <div className="organizer-events">
            <h2>Organizer Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.event_title}</li>
                ))}
            </ul>
        </div>
    )
}

export default OrganizerEvents;