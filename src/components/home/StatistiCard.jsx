import { Users, Building, House, UsersRound } from 'lucide-react';
import CountUp from 'react-countup';
import "../../assets/styles/styleHome.css";
export default function StatisiCard(){
    return(
        <div style={{margin:"60px 0px",height:'30vh',display:"flex",justifyContent:"center",alignItems:"center",gap:"30px"}}>
            <div className='CardSta'>
                <div className="icn">
                    <Users/>
                </div>
                <div className="number">
                    <CountUp end={15000} duration={2} separator="," style={{fontSize:"33px",fontWeight:"700"}}/>+
                </div>
                <div className="content">Happy Students</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <Building/>
                </div>
                <div className="number">
                    <CountUp end={8500} duration={2} separator="," style={{fontSize:"33px",fontWeight:"700"}}/>+
                </div>
                <div className="content">Properties Listed</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <House/>
                </div>
                <div className="number">
                    <CountUp end={120} duration={2} separator="," style={{fontSize:"33px",fontWeight:"700"}}/>+
                </div>
                <div className="content">Universities</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <UsersRound/>
                </div>
                <div className="number">
                    <CountUp end={6200} duration={2} separator="," style={{fontSize:"33px",fontWeight:"700"}}/>+
                </div>
                <div className="content">Roommate Matches</div>
            </div>
        </div>
    );
}