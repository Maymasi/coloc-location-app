import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { MapPin} from 'lucide-react';
import { useEffect,useState } from 'react';
import { getSimilarAnnonces,RemoveFavorisAnnonce,AddFavorisAnnonce,getMyFavoris } from '../../../Services/AnnonceService';
import { useNavigate } from 'react-router-dom';
export default function SimilarProperties({annonce}){
    //navigate
    const navigate = useNavigate();
    const goToDetails = (id) => {
      navigate(`/details/${id}`);
      window.scrollTo(0, 0); 
    };

    const [similar, setSimilar] = useState([]);
    const [isFavori, setIsFavori] = useState([]);
    useEffect(() => {
        const fetchSimilar = async () => {
        try {
            const data = await getSimilarAnnonces(annonce.id);
            console.log(data.$values)
            setSimilar(data.$values);
        } catch (err) {
            console.error("Erreur similaires :", err);
        }
        };
        fetchSimilar();
    }, [annonce.id]);

    useEffect(() => {
      const fetchFavoris = async () => {
        try {
          const data = await getMyFavoris(); 
          const ids = data.$values.map(fav => fav.id); 
          console.log("ids :",ids)
          setIsFavori(ids);
        } catch (error) {
          console.error("Erreur lors du chargement des favoris :", error);
        }
      };
        fetchFavoris();
    }, []);    
    const handelFavori = async (id) => {
        let newFavoris 
        if(isFavori.includes(id)){
            let data= await RemoveFavorisAnnonce(id)
            newFavoris = isFavori.filter(favId => favId !== id);
            console.log(data)
        }else{
            let data=await AddFavorisAnnonce(id)
            newFavoris = [...isFavori,id]
            console.log(data)
        }
        setIsFavori(newFavoris)
    }
    return(
        <div className='similarPropertiesContainer'>
            <div className="titleSimilarPart">Similar Properties</div>
            <div className="cardsSimilarPart">
                {similar.length === 0 ? (
                    <div  style={{ justifyContent:"center",width:"100%",height:"100%", textAlign: "center", fontSize: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "24px" }}>
                        <div style={{ fontSize: "48px", marginBottom: "15px"}}>🏡</div>
                        <div style={{ fontWeight: "500" }}>Aucune propriété similaire disponible</div>
                        <div style={{ fontSize: "13px", color: "#9e9e9e" }}>Essayez de modifier vos critères ou explorez d'autres quartiers.</div>
                    </div>                  
                ) : (
                    similar.map((property)=>{
                        return(
                            <div className="cardResultat" key={property.annonceId}
                            style={{width: "30% !important",cursor:"pointer"}}
                            onClick={()=>goToDetails(property.annonceId)}
                            >
                                <div className="containerPic">
                                <img src={property.photos.$values[0].url} alt="" />
                                <div className="heartTopRight">
                                    <Checkbox  icon={<FavoriteBorder color="#fe7364" />} checkedIcon={<Favorite color="#fe7364"/>}
                                        onClick={(e)=>e.stopPropagation()}
                                        onChange={()=>handelFavori(property.annonceId)}
                                        checked={isFavori.includes(property.annonceId)}
                                    />
                                </div>
                                <div className="typeTopLeft">{property.type}</div>
                                </div>
                                <div className="infoSectionn">
                                <div className="descrbAndPrice">
                                    <div className="describ">{property.title}</div>
                                    <div className="Pprice">
                                    <span style={{fontSize:"20px",fontWeight:"700"}}>{property.prix}DH/</span>
                                    <span style={{fontSize:"18px",fontWeight:"700"}}>mo</span>
                                    </div>
                                </div>
                                <div className="address">
                                    <MapPin size={"15px"}/>
                                    <div style={{fontSize:"16px"}}>{property.ville}</div>
                                </div>
                                <div className="infoSupp">
                                    <div className="bedsAndBaths">
                                    <span style={{fontSize:"16px",fontWeight:"500"}}>{property.beds} Beds</span>
                                    <span style={{ fontSize: '18px', lineHeight: '0' }}>•</span>
                                    <span style={{fontSize:"16px",fontWeight:"500"}}>{property.baths} Baths</span>
                                    </div>
                                    <div className="availability">Available Now</div>
                                </div>
                                </div>
                            </div>
                    )})
                )}
            </div>
        </div>
    );
}