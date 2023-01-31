import {json, redirect, useRouteLoaderData, defer, Await} from "react-router-dom";
import {Suspense} from "react";

import EventItem from "../components/EventItem/EventItem";
import EventsList from "../components/EventsList/EventsList";

const EventDetailPage = () => {
    const {event, events} = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Event Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Events Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
};

export default EventDetailPage;

export const loadEvent = async (id) => {
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if(!response.ok) {
        throw json({message: 'Couldn\'t find this event!'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.event;
    }
};

export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if(!response.ok) {
        // return {isError: true, message: 'Couldn\'t fetch events!'};
        // throw new Response(JSON.stringify({message: 'Couldn\'t fetch events!'}), {status: 500});
        return json({message: 'Couldn\'t fetch events!'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.events;
        // return response;
    }
};

export const loader = async ({request, params}) => {
    const id = params.eventId;
    return defer({
        event: await loadEvent(id),    //await means component will render when loadEvent(id) is loaded
        events: loadEvents()
    })
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