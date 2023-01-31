import {useRouteError} from 'react-router-dom';

import MainNavigation from "../components/MainNavigation/MainNavigation";
import PageContent from "../components/PageContent/PageContent";

const ErrorPage = () => {
    const error = useRouteError();
    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if(error.status === 500) {
        // for throwing new Response()
        // message = JSON.parse(error.data).message;
        //for using json()
        message = error.data.message;

    }
    if(error.status === 404) {
        title = 'Not found!';
        message = 'Couldn\'t find resource or page!'
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>

        </>
    );

};

export default ErrorPage;