import { Users, Building, House, UsersRound } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import "../../assets/styles/styleHome.css";
export default function StatisiCard(){
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3 
    });
    useEffect(() => {
        if (inView) {
            setStartCount(true);
        }
    }, [inView]);
    const [startCount, setStartCount] = useState(false);
    return(
        <div data-aos="fade-up" style={{margin:"60px 0px",height:'30vh',display:"flex",justifyContent:"center",alignItems:"center",gap:"30px"}}>
            <div ref={ref} className='CardSta'>
                <div className="icn">
                    <Users/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={15000}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Happy Students</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <Building/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={8500}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Properties Listed</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <House/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={120}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Universities</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <UsersRound/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={6200}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Roommate Matches</div>
            </div>
        </div>
    );
}