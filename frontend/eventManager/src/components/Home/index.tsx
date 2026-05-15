import "./index.css";
import AttendeeDashboard from "../AttendeeDashboard";
import OrganizerDashboard from "../OganizerDashboard";
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import {observer} from 'mobx-react-lite'
import authStore from '../../stores/authstore'


import eventStore from "../../stores/eventStore";
import { apiUrl, authenticatedFetch } from "../../utils/api";

const Home = observer(() => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    if(!authStore.isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    const role = authStore.role;

    const getUserProfile = async () => {
        const response = await authenticatedFetch(apiUrl("/event/profile/"), {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Unable to fetch user profile");
        }

        const data = await response.json();
        authStore.setProfile(data.role, data.username, data.user_id, data.email, data.phone);
        await getEventsListBasedOnRole(data.role);
    };

    const getEventsListBasedOnRole = async (role: string) => {
        const eventsUrl = role === "organizer" ? apiUrl("/event/organizer-events/") : apiUrl("/event/attendee-events/");
        const response = await authenticatedFetch(eventsUrl, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Unable to fetch events");
        }

        const data = await response.json();
        console.log("Events data based on role:", data);
        role === "organizer" ? eventStore.setOrganizerEventsList(data.events) : eventStore.setAttendeeEventsList(data.events);
    };

    useEffect(() => {
        const initializeHome = async () => {
            try {
                setError("");
                await getUserProfile();
            } catch (error) {
                console.error("Error initializing home:", error);
                const message = error instanceof Error ? error.message : "Something went wrong";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        initializeHome();
    }, []);

    return (
        <div className="home-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {role === "organizer" && <OrganizerDashboard />}
                    {role === "attendee" && <AttendeeDashboard />}
                </>
            )}
        </div>
    );
});

export default Home;
