import MySlider from "../components/home/MySlider";
import Nav from "../components/home/Nav";
import StatisiCard from "../components/home/StatistiCard";
import SimpleProcess from "../components/home/SimpleProcess";
import FeaturedProperties from "../components/home/FeaturedProperties";
import FindStudent from "../components/home/FindStudent";
import WhyChose from "../components/home/WhyChose";
export default function HomePage(){
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
        </>
    );
}