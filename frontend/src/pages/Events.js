import {useLoaderData, json, defer, Await} from 'react-router-dom';

import EventsList from "../components/EventsList/EventsList";
import {Suspense} from "react";

// const DUMMY_EVENTS = [
//     {id: 'e1', title: 'first event', image: 'https://source.unsplash.com/user/wsanter', date: new Date('2022-12-17').toISOString()},
//     {id: 'e2', title: 'second event', image: 'https://source.unsplash.com/user/wsanter', date: new Date('2022-01-17').toISOString()},
//     {id: 'e3', title: 'third event', image: 'https://source.unsplash.com/user/wsanter', date: new Date('2022-02-17').toISOString()},
//     {id: 'e4', title: 'fourth event', image: 'https://source.unsplash.com/user/wsanter', date: new Date('2022-03-17').toISOString()}
// ];


const EventsPage = () => {
    const {events} = useLoaderData();

    // if(response.isError) {
    //     return <p>{response.message}</p>
    // }
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    );
};

export default EventsPage;

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

export const loader = () => {
    return defer({
        events: loadEvents()
    })
};