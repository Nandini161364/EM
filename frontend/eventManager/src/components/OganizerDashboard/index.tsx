import { RiCalendarEventFill } from "react-icons/ri";
import "./index.css";
import eventStore from "../../stores/eventStore";
import authStore from "../../stores/authstore";

import EventList from "./EventList";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const OrganizerDashboard = observer(() => {
    const events = eventStore.organizerEvents; 
    const totalEvents = events.length;

    const navigate = useNavigate();

    const totalBookings = events.reduce(
        (total, event) => total + (event.total_bookings_count ?? event.maximum_attendees - event.available_seats),
        0
    );
    const totalRevenue = events.reduce((total, event) => {
        const bookingsCount = event.total_bookings_count ?? event.maximum_attendees - event.available_seats;
        const ticketPrice = event.ticket_details[0]?.ticket_price ?? 0;
        return total + bookingsCount * ticketPrice;
    }, 0);

    const upcomingEvents = events.filter((event) => new Date(event.start_date) >= new Date()).length;
    const initials = authStore.username
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "OP";

    const handleLogout = () => {
        authStore.logout();
    };
    const renderOrganizerEventsListPage = () => {
        navigate('/organizer/events');
    }
    const renderCreateEventPage = () => {
        navigate('/organizer/events/create');
    };

    return (
        <section className="organizer-dashboard">
            <div className="organizer-dashboard-header">
                <div className="logo-container">
                    <RiCalendarEventFill className="logo-icon" />
                    <h1 className="logo-text">Eventful</h1>
                </div>
                <div className="organizer-dashboard-navbar">
                    <h1>Overview</h1>
                    <div className="search-create-event-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search events..."
                        />
                        <button className="create-event-button" onClick={renderCreateEventPage}>Create event</button>
                    </div>
                </div>
            </div>
            <div className="organizer-dashboard-left-side-bar">
                <div className="filter-group">
                    <h1>MAIN</h1>
                <ul>
                    <li className="active">Overview</li>
                    <li onClick={renderOrganizerEventsListPage}>My Events</li>
                    <li>Attendees</li>
                    <li>Bookings</li>
                </ul>
                <h1>INSIGHTS</h1>
                <ul>
                    <li>Analytics</li>
                    <li>Notifications</li>
                </ul>
                <h1>Account</h1>
                <ul>
                    <li>Settings</li>
                </ul>
                </div>
                <div className="organizer-profile-container">
                    <div className="profile-picture">{initials}</div>
                    <span className="profile-name">{authStore.username || "Organizer Name"}</span>
                    <span>Organizer</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="organizer-dashboard-main-content">
                <div className="stats-cards-container">
                    <div className="stats-card">
                        <h2>Total Events</h2>
                        <p>{totalEvents}</p>
                        <span>Managed events</span>
                    </div>
                    <div className="stats-card">
                        <h2>Total Bookings</h2>
                        <p>{totalBookings}</p>
                        <span>Across all events</span>
                    </div>
                    <div className="stats-card">
                        <h2>Total Revenue</h2>
                        <p>${totalRevenue.toFixed(2)}</p>
                        <span>Ticket revenue</span>
                    </div>
                    <div className="stats-card">
                        <h2>Upcoming</h2>
                        <p>{upcomingEvents}</p>
                        <span>Scheduled events</span>
                    </div>
                </div>
                <div className="events-table-container">
                    <div className="events-table-toolbar">
                        <h2>Recent Events</h2>
                        <div className="events-filter-controls">
                            <select className="status-filter" aria-label="Filter by status">
                                <option>All statuses</option>
                                <option>Active</option>
                                <option>Full</option>
                                <option>Ended</option>
                            </select>
                            <button className="filter-button">Filter</button>
                        </div>
                    </div>
                    <EventList eventsList={eventStore.getLatestEvents()} />
                </div>
            </div>
        </section>
    )
});

export default OrganizerDashboard;
