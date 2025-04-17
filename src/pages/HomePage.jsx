import MySlider from "../components/home/MySlider";
import Nav from "../components/home/Nav";
import StatisiCard from "../components/home/StatistiCard";
import SimpleProcess from "../components/home/SimpleProcess";
export default function HomePage(){
    return(
        <>
            <Nav/>
            <MySlider/>
            <StatisiCard/>
            <SimpleProcess/>
        </>
    );
}