import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import Nav from '../components/Nav';

const Root = () => {

  const location = useLocation()

    return (
        <div>
            {location.pathname == '/' ? '' : <Nav></Nav>}
            <Outlet />
            <Footer />
            <Toaster position="top-right" toastOptions={{ duration: 3000, }} ></Toaster>
        </div >
    );
};

export default Root;