import Nav from '../components/home/Nav';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const PrincipalePageLayout = () => {
    return (
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default PrincipalePageLayout;
