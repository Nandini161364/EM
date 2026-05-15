import { makeAutoObservable } from "mobx";
import { type Event } from "../types/home";
import { type CreateEvent } from "../types/event";

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
}

const eventStore = new EventStore();

export default eventStore;