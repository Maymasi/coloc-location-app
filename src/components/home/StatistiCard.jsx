import { Users, Building, House, UsersRound } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {getStatistics} from '../../Services/HomeService';
export default function StatisiCard(){
    const [startCount, setStartCount] = useState(false);
    const [statistics, setStatistics] = useState();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3 
    });
    useEffect(() => {
        if (inView) {
            setStartCount(true);
        }
    }, [inView]);
    useEffect(()=>{
        const fetchStatistics = async () => {
            try {
                const data = await getStatistics();
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };
        fetchStatistics();
    })
    return(
        <div className='cardsSta' data-aos="fade-up" style={{margin:"60px 0px",height:'30vh',display:"flex",justifyContent:"center",alignItems:"center",gap:"30px"}}>
            <div ref={ref} className='CardSta'>
                <div className="icn">
                    <Users/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={statistics.totalStudents || 0}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Étudiants heureux</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <Building/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={statistics.totalProperties || 0}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Propriétés listées</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <House/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={statistics.totalUniversities || 0}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Universités</div>
            </div>
            <div className='CardSta'>
                <div className="icn">
                    <UsersRound/>
                </div>
                <div className="number">
                    {startCount && (
                        <CountUp
                        end={statistics.roomateMatches || 0}
                        duration={2}
                        separator=","
                        style={{ fontSize: '33px', fontWeight: '700' }}
                        />
                    )}
                    {!startCount && (
                        <div style={{ fontSize: '33px', fontWeight: '700' }}>0</div>
                    )}+
                </div>
                <div className="content">Colocataires compatibles</div>
            </div>
        </div>
    );
}