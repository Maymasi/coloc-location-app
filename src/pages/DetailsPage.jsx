
import ImagesAnnonces from "../components/student/Details/imagesAnnonces";
import InformationAnnonces from "../components/student/Details/InformationAnnonces";
import SimilarProperties from "../components/student/Details/SimilarProperties";
export default function DetailsPage(){
    return(
        <div className="detailsParent">
            <ImagesAnnonces/>
            <InformationAnnonces/>
            <SimilarProperties/>
        </div>
    );
}