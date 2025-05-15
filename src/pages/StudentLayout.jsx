import LeftNav from '../components/common/LeftNav';
import TopNav from '../components/common/TopNav';  
import { Outlet } from 'react-router-dom';
import '../assets/styles/userCss/userLayout.css';
import {Menu} from 'lucide-react';
import { useState } from 'react';

const StudentLayout = () => {
  const [openLogs, setOpenLogs] = useState(false);

  const handleLogsClick = () => {
    setOpenLogs(prev => !prev);
    console.log(openLogs)
  };
  return (
    <div className="user-layout">
        <div className="left-bar">
             <LeftNav openLogs={openLogs} handleLogsClick={handleLogsClick}/>
        </div>
        <div className="content-user-layout">
            <div className="top-bar">
                <TopNav handleLogsClick={handleLogsClick} openLogs={openLogs} />
            </div>
            <div className="main-content" style={{width: '100%'}}>
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default StudentLayout;
