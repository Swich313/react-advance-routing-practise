import {json, redirect} from 'react-router-dom';

import EventForm from "../components/EventForm/EventForm";

const NewEventPage = () => {
    return (
        <EventForm />
    );
};

export const action = async ({request, params}) => {
    const data = await request.formData();
    const enteredData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    };
    console.log(request)
    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(enteredData)
    });

    if(!response.ok){
        throw json({message: 'Couldn\'t create an event!'}, {status: 500});
    }
    return redirect('/events');
};

export default NewEventPage;