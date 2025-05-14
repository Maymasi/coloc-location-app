import MySlider from "../components/home/MySlider";
import Nav from "../components/home/Nav";
import StatisiCard from "../components/home/StatistiCard";
import SimpleProcess from "../components/home/SimpleProcess";
import FeaturedProperties from "../components/home/FeaturedProperties";
import FindStudent from "../components/home/FindStudent";
import WhyChose from "../components/home/WhyChose";
import StudentSay from "../components/home/StudentSay";
import JoinNewsletter from "../components/home/JoinNewsletter";
import StudentHousingBanner from "../components/home/StudentHousingBanner";
import "../assets/styles/styleHome.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export default function HomePage(){
    useEffect(() => {
        AOS.init({
            duration: 1500, 
            once: true,
        });
    }, []);
    return(
        <div className="HomeParent">
            <MySlider/>
            <StatisiCard/>
            <SimpleProcess/>
            <FeaturedProperties/>
            <FindStudent/>
            <WhyChose/>
            <StudentSay/>
            <JoinNewsletter/>
            <StudentHousingBanner/>
        </div>
    );
}