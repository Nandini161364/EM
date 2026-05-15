import { makeAutoObservable } from "mobx";
import { type Event } from "../types/event";

class EventStore {
    organizerEvents: Event[] = [];
    attendeeEvents: Event[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setOrganizerEventsList(events: Event[]) {
        this.organizerEvents = events;
    }

    addEvent(event: Event) {
        this.organizerEvents.push(event);
    }

    setAttendeeEventsList(events: Event[]) {
        this.attendeeEvents = events;
    }

    clearEventsList() {
        this.organizerEvents = [];
        this.attendeeEvents = [];
    }

    getLatestEvents() {
        const latestEvents = this.organizerEvents.filter(event => {
            const eventDate = new Date(event.start_date);
            const currentDate = new Date();
            return eventDate >= currentDate;
        });
        return latestEvents;
    }
}

const eventStore = new EventStore();

export default eventStore;