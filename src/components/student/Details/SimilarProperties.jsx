import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { MapPin} from 'lucide-react';
const properties = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    title: `Modern Studio ${i + 1}`,
    price: 750 + i * 10,
    image: "../../../public/Room.jfif",
    address: `456 College St, Downtown`,
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
}));
export default function SimilarProperties(){
    return(
        <div className='similarPropertiesContainer'>
            <div className="titleSimilarPart">Similar Properties</div>
            <div className="cardsSimilarPart">
                {properties.map((property)=>{
                    return(
                        <div className="cardResultat" key={property.id} style={{width: "30% !important"}}>
                            <div className="containerPic">
                            <img src={property.image} alt="" />
                            <div className="heartTopRight">
                                <Checkbox  icon={<FavoriteBorder color="#fe7364" />} checkedIcon={<Favorite color="#fe7364"/>} />
                            </div>
                            <div className="typeTopLeft">{property.type}</div>
                            </div>
                            <div className="infoSectionn">
                            <div className="descrbAndPrice">
                                <div className="describ">{property.title}</div>
                                <div className="Pprice">
                                <span style={{fontSize:"20px",fontWeight:"700"}}>${property.price}/</span>
                                <span style={{fontSize:"18px",fontWeight:"700"}}>mo</span>
                                </div>
                            </div>
                            <div className="address">
                                <MapPin size={"15px"}/>
                                <div style={{fontSize:"16px"}}>{property.address}</div>
                            </div>
                            <div className="infoSupp">
                                <div className="bedsAndBaths">
                                <span style={{fontSize:"16px",fontWeight:"500"}}>{property.bedrooms} Beds</span>
                                <span style={{ fontSize: '18px', lineHeight: '0' }}>•</span>
                                <span style={{fontSize:"16px",fontWeight:"500"}}>{property.bathrooms} Baths</span>
                                </div>
                                <div className="availability">Available Now</div>
                            </div>
                            </div>
                        </div>
                )})}
            </div>
        </div>
    );
}