import Nav from "../components/home/Nav";
import ImagesAnnonces from "../components/student/Details/imagesAnnonces";
import InformationAnnonces from "../components/student/Details/InformationAnnonces";
export default function DetailsPage(){
    return(
        <>
            <Nav/>
            <ImagesAnnonces/>
            <InformationAnnonces/>
        </>
    );
}