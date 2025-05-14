import LeftNavAdmin from '../components/admin/LeftNavAdmin'
import TopNav from '../components/common/TopNav';  
import { Outlet } from 'react-router-dom';
import '../assets/styles/userCss/userLayout.css';

const AdminLayout = () => {
    return (
    <div className="user-layout">
        <div className="left-bar">
            <LeftNavAdmin />
        </div>
        <div className="content-user-layout">
            <div className="top-bar">
                <TopNav />
            </div>
            <div className="main-content" style={{width: '100%'}}>
                <Outlet />
            </div>
        </div>
    </div>
    );
};

export default AdminLayout;
