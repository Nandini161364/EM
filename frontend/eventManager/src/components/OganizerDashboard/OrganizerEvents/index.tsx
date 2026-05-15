import eventStore from "../../../stores/eventStore";
import EventList from "../EventList";

const OrganizerEvents = () => {

    return (
        <EventList eventsList={eventStore.organizerEvents} />
    );
}

export default OrganizerEvents;