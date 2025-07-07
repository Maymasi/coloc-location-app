import * as React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { House, Users, Building, Shield } from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';
import Slider from "react-slick";
import Button from '@mui/material/Button';

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{
            right: "-350px",
            color: "black",
            borderRadius: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex"
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{
            left: "350px",
            color: "black",
            borderRadius: "100%",
            display: "flex",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </div>
    );
}

export default function MySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    const infos = [
        {
            icon: "House",
            title: "Universités",
            bigTitle: "Appartements",
            descreption: "Découvrez des appartements étudiants modernes près de votre campus, avec toutes les commodités nécessaires pour un confort optimal.",
            evaluation: "4.8",
            img: "/studentAppartment.jpg"
        },
        {
            icon: "Users",
            title: "Partout au Maroc",
            bigTitle: "Trouver un coloc",
            descreption: "Notre système intelligent vous aide à trouver des colocataires compatibles selon vos préférences et votre mode de vie.",
            evaluation: "4.9",
            img: "/Roomate.jpg"
        },
        {
            icon: "Building",
            title: "Propriétaires",
            bigTitle: "Annonces Premium",
            descreption: "Mettez en avant vos biens auprès d'une communauté étudiante ciblée et gérez vos annonces facilement.",
            evaluation: "4.7",
            img: "/Premium Listings.jpg"
        },
        {
            icon: "Shield",
            title: "Tous les Logements",
            bigTitle: "Logements Vérifiés",
            descreption: "Toutes nos annonces sont vérifiées par notre équipe pour garantir la qualité, la sécurité et la fiabilité des informations.",
            evaluation: "4.9",
            img: "/securityHouse.png"
        }
    ];

    const iconMap = {
        House: House,
        Users: Users,
        Building: Building,
        Shield: Shield
    };

    return (
        <Slider {...settings}>
            {infos.map((info, index) => {
                const IconComponent = iconMap[info.icon];
                return (
                    <div key={index}>
                        <div className="slide">
                            <div className="leftSide">
                                <div className="title">
                                    <IconComponent />
                                    <p style={{ fontSize: "16px" }}>{info.title}</p>
                                </div>
                                <p className="BigTitle">{info.bigTitle}</p>
                                <p className="DescriptionSlider">{info.descreption}</p>
                                <div className="underDescription">
                                    <div className="evaluation">
                                        <StarIcon style={{ fontSize: "28px", color: "#ffa000" }} />
                                        <div style={{ fontSize: "20px" }}>{info.evaluation}</div>
                                        <div style={{ fontSize: "17px", color: "#757575", fontWeight: "400" }}>(56 avis)</div>
                                    </div>
                                    <div style={{ fontSize: "24px" }}>•</div>
                                    <div style={{ fontSize: "17px", color: "#424242" }}>À partir de 1500</div>
                                </div>
                                <div className="buttons">
                                    <Button variant="contained" style={{ borderRadius: "9999px", padding: "15px", width: "150px", fontSize: "14px", backgroundColor: "#fd7667ea" }}>
                                        Rechercher
                                    </Button>
                                    <Button className="learnMoreBtn" variant="outlined" style={{ borderRadius: "9999px", padding: "15px", width: "130px", fontSize: "14px", color: "#fd7667ea", borderColor: "#fd7667ea" }}>
                                        Découvrir
                                    </Button>
                                </div>
                            </div>
                            <div variant="outlined" className="rightSide" style={{ borderRadius: "24px" }}>
                                <div className="imageContainer">
                                    <img src={info.img} alt="house" />
                                </div>
                                <div className="infoSection">
                                    <div className="titleRating">
                                        <p style={{ fontSize: "22px", fontWeight: "600" }}>{info.bigTitle}</p>
                                        <span className="rating">
                                            <StarIcon style={{ fontSize: "24px", color: "#ffa000" }} />
                                            <div style={{ fontSize: "15px" }}>{info.evaluation}</div>
                                        </span>
                                    </div>
                                    <p className="description">
                                        Découvrez des appartements étudiants modernes...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
