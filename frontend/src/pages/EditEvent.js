import {useRouteLoaderData} from 'react-router-dom';

import EventForm from "../components/EventForm/EventForm";

const EditEventPage = () => {
    const data = useRouteLoaderData('event-detail');
    return (
        <EventForm event={data.event}/>
    );
};

export default EditEventPage;