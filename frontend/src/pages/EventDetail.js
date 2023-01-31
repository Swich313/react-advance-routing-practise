import {json, redirect, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem/EventItem";

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail');
    console.log(data)
    return (
        <EventItem event={data.event} />
    );
};

export default EventDetailPage;

export const loader = async ({request, params}) => {
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if(!response.ok) {
        throw json({message: 'Couldn\'t find this event!'}, {status: 500});
    } else {
        return response;
    }
};

export const action = async ({request, params}) => {
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: request.method
    });
    if(!response.ok) {
        throw json({message: 'Couldn\'t delete this event!'}, {status: 500});
    }
    return redirect('/events');
};