
import ImagesAnnonces from "../components/student/Details/imagesAnnonces";
import InformationAnnonces from "../components/student/Details/InformationAnnonces";
import SimilarProperties from "../components/student/Details/SimilarProperties";
import {getAnnonceById} from "../Services/AnnonceService"
import {useState,useEffect } from "react";
import { useParams } from "react-router-dom";
export default function DetailsPage(){
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);
   
    useEffect(() => {
        const fetchAnnonce = async () => {
        try {
            const data = await getAnnonceById(id);
            setAnnonce(data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
        };
        fetchAnnonce();
    }, [id]);

    if (!annonce) return <div>Chargement...</div>;

    return(
        <div className="detailsParent">
            <ImagesAnnonces annonce={annonce}/>
            <InformationAnnonces annonce={annonce} />
            <SimilarProperties annonce={annonce}/>
        </div>
    );
}