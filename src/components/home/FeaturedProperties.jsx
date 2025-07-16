import { MoveRight, Star, MapPin, Bed, ShowerHead, Wifi } from 'lucide-react';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { getFeaturedProperties } from '../../Services/HomeService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProperties() {
    const navigate = useNavigate();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    
    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            try {
                const response = await getFeaturedProperties();
                setFeaturedProperties(response.$values);
                console.log(response);
            } catch (error) {
                console.error("Erreur lors du chargement des propriétés en vedette :", error);
            }
        }
        fetchFeaturedProperties();
    }, []);

    return (
        <div className='FeaturedContainer' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: "40px 100px" }}>
            <div className="top" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="titleFeatured">Propriétés en vedette</div>
                <div className="viewAll" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#fe7364" }}>
                    <div style={{ fontSize: "15px",cursor:"pointer" }} onClick={()=>navigate("/annonces")}>Voir tout</div>
                    <MoveRight size={15} />
                </div>
            </div>
            <div className="FeaturedCards">
                {featuredProperties.map((property, index) => (
                    <div className="featuredCard" data-aos="fade-up" data-aos-delay="150" data-aos-easing="ease-in-out" key={index}>
                        <div className="topPic">
                            <img src={`https://localhost:7174${property.image}`} alt="" />
                            <div className="starTopRight">
                                <Star size={24} color="black" />
                            </div>
                        </div>
                        <div className="infoSec">
                            <div className="underLine">
                                <div className="houseDescrip">{property.titre}</div>
                                <div className="evaluation">
                                    <StarIcon style={{ color: "#ffa726" }} />
                                    <div>4.8</div>
                                </div>
                            </div>
                            <div className="adress">
                                <MapPin />
                                <div style={{ fontSize: "16px", fontWeight: "400" }}>{property.adresse}</div>
                            </div>
                            <div className="carac">
                                <div className="bed">
                                    <Bed size={"19px"} />
                                    <div>{property.nbSallesBain} chambre(s)</div>
                                </div>
                                <div className="bath">
                                    <ShowerHead size={"19px"} />
                                    <div>{property.nbChambres} bain(s)</div>
                                </div>
                                <div className="wifi">
                                    <Wifi size={"19px"} />
                                    <div>Wi-Fi</div>
                                </div>
                            </div>
                            <div className="footerCard">
                                <div className="price">
                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>{property.prix}DH </div>
                                    <div style={{ fontSize: "12px", color: "#656565" }}>/ mois</div>
                                </div>
                                <Button variant="contained" className="viewDetailsBtn" onClick={()=>navigate(`details/${property.id}`)}>Voir plus</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
