import LeftNav from '../common/LeftNav';
import TopNav from '../common/TopNav';  
import { Outlet } from 'react-router-dom';
import '../../assets/styles/userCss/userLayout.css';

const StudentLayout = () => {
  return (
    <div className="user-layout">
        <div className="left-bar">
             <LeftNav />
        </div>
        <div className="content-user-layout">
            <div className="top-bar">
                <TopNav />
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default StudentLayout;
