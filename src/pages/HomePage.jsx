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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export default function HomePage(){
    useEffect(() => {
        AOS.init({
          duration: 1500, // durée de l’animation (en ms)
          once: true, // animation seulement au premier scroll
        });
    }, []);
    return(
        <>
            <Nav/>
            <MySlider/>
            <StatisiCard/>
            <SimpleProcess/>
            <br/>
            <FeaturedProperties/>
            <FindStudent/>
            <WhyChose/>
            <StudentSay/>
            <JoinNewsletter/>
            <StudentHousingBanner/>
        </>
    );
}