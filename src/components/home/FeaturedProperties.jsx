import {MoveRight,Star,MapPin,Bed,ShowerHead,Wifi} from 'lucide-react';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
export default function FeaturedProperties(){
    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:"40px 180px"}}>
            <div className="top" style={{display:"flex",justifyContent:"space-between"}}>
                <div className="titleFeatured">Featured Properties</div>
                <div className="viewAll" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",color:"#fe7364"}}>
                    <div style={{fontSize:"15px"}}>View All</div>
                    <MoveRight size={15}/>
                </div>
            </div>
            <div className="FeaturedCards">
                <div className="featuredCard" data-aos="fade-up" data-aos-delay="0" data-aos-easing="ease-in-out">
                    <div className="topPic">
                        <img src="../../../public/Room.jfif" alt="" />
                        <div className="starTopRight">
                            <Star size={24} color="black" />
                        </div>
                    </div>
                    <div className="infoSec">
                        <div className="underLine">
                            <div className="houseDescrip">Modern Student Apartment</div>
                            <div className="evaluation">
                                <StarIcon style={{color:"#ffa726"}}/>
                                <div>4.8</div>
                            </div>
                        </div>
                        <div className="adress">
                            <MapPin size={"15px"}/>
                            <div style={{fontSize:"16px",fontWeight:"400"}}>Near University Campus</div>
                        </div>
                        <div className="carac">
                            <div className="bed">
                                <Bed size={"19px"}/>
                                <div>2 Beds</div>
                            </div>
                            <div className="bath">
                                <ShowerHead size={"19px"}/>
                                <div>1 Bath</div>
                            </div>
                            <div className="wifi">
                                <Wifi size={"19px"}/>
                                <div>Wifi</div>
                            </div>
                        </div>
                        <div className="footerCard">
                            <div className="price">
                                <div style={{fontSize:"20px",fontWeight:"700"}}>$650 </div>
                                <div style={{fontSize:"12px",color:"#656565"}}>/ month</div>
                            </div>
                            <Button variant="contained" className="viewDetailsBtn">View Details</Button>
                        </div>
                    </div>
                </div>
                <div className="featuredCard" data-aos="fade-up" data-aos-delay="150" data-aos-easing="ease-in-out">
                    <div className="topPic">
                        <img src="../../../public/Room.jfif" alt="" />
                        <div className="starTopRight">
                            <Star size={24} color="black" />
                        </div>
                    </div>
                    <div className="infoSec">
                        <div className="underLine">
                            <div className="houseDescrip">Modern Student Apartment</div>
                            <div className="evaluation">
                                <StarIcon style={{color:"#ffa726"}}/>
                                <div>4.8</div>
                            </div>
                        </div>
                        <div className="adress">
                            <MapPin/>
                            <div style={{fontSize:"16px",fontWeight:"400"}}>Near University Campus</div>
                        </div>
                        <div className="carac">
                            <div className="bed">
                                <Bed size={"19px"}/>
                                <div>2 Beds</div>
                            </div>
                            <div className="bath">
                                <ShowerHead size={"19px"}/>
                                <div>1 Bath</div>
                            </div>
                            <div className="wifi">
                                <Wifi size={"19px"}/>
                                <div>Wifi</div>
                            </div>
                        </div>
                        <div className="footerCard">
                            <div className="price">
                                <div style={{fontSize:"20px",fontWeight:"700"}}>$650 </div>
                                <div style={{fontSize:"12px",color:"#656565"}}>/ month</div>
                            </div>
                            <Button variant="contained" className="viewDetailsBtn">View Details</Button>
                        </div>
                    </div>
                </div>
                <div className="featuredCard" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in-out">
                    <div className="topPic">
                        <img src="../../../public/Room.jfif" alt="" />
                        <div className="starTopRight">
                            <Star size={24} color="black" />
                        </div>
                    </div>
                    <div className="infoSec">
                        <div className="underLine">
                            <div className="houseDescrip">Modern Student Apartment</div>
                            <div className="evaluation">
                                <StarIcon style={{color:"#ffa726"}}/>
                                <div>4.8</div>
                            </div>
                        </div>
                        <div className="adress">
                            <MapPin/>
                            <div style={{fontSize:"16px",fontWeight:"400"}}>Near University Campus</div>
                        </div>
                        <div className="carac">
                            <div className="bed">
                                <Bed size={"19px"}/>
                                <div>2 Beds</div>
                            </div>
                            <div className="bath">
                                <ShowerHead size={"19px"}/>
                                <div>1 Bath</div>
                            </div>
                            <div className="wifi">
                                <Wifi size={"19px"}/>
                                <div>Wifi</div>
                            </div>
                        </div>
                        <div className="footerCard">
                            <div className="price">
                                <div style={{fontSize:"20px",fontWeight:"700"}}>$650 </div>
                                <div style={{fontSize:"12px",color:"#656565"}}>/ month</div>
                            </div>
                            <Button variant="contained" className="viewDetailsBtn">View Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}