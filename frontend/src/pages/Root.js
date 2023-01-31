import {Outlet, useNavigation} from 'react-router-dom';
import MainNavigation from "../components/MainNavigation/MainNavigation";

const RootLayout = () => {
    const {state} = useNavigation();
    return (
        <>
        <MainNavigation />
            {/*{state === 'loading' && <p>Loading...</p>}*/}
        <Outlet />
        </>
    );
};
export default RootLayout;

