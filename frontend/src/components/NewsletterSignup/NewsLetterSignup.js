import {useFetcher} from "react-router-dom";
import {useEffect, useRef} from "react";

import classes from "./NewsLetterSignup.module.css";

const NewsLetterSignup = () => {
    const fetcher = useFetcher();
    const  {data, state} = fetcher;
    const emailRef = useRef();
    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
            emailRef.current.value = '';
        }
    }, [data, state]);

    return (
        <fetcher.Form method='post' action='/newsletter' className={classes.newsletter}>
            <input type='email'
                   name='email'
                   ref={emailRef}
                   placeholder='Sign up for newsletter...'
                   aria-label='Sign up for newsletter...'/>
            <button>Sign up</button>
        </fetcher.Form>
    );
};

export default NewsLetterSignup;