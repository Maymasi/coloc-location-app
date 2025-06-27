import { Heart, Dot, MapPin } from "lucide-react";


function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

const recommendedHomes = [
    {
        id: 1,
        type: "studio",
        title: "Studio à louer",
        price: "5000 MAD/mois",
        location: "12 safi ijennnane morroco",
        rooms: "1 chambre",
        bathrooms: "1 salle de bain",
        available: "Disponible",
        image: "/src/assets/images/home.jpg"
    },
    {
        id: 2,
        type: "studio",
        title: "Studio à louer",
        price: "5000 MAD/mois",
        location: "12 safi ij",
        rooms: "1 chambre",
        bathrooms: "1 salle de bain",
        available: "Disponible",
        image: "/src/assets/images/home.jpg"
    },
    {
        id: 3,
        type: "studio",
        title: "Studio à louer",
        price: "5000 MAD/mois",
        location: "12 safi ijennnane safi morroco",
        rooms: "1 chambre",
        bathrooms: "1 salle de bain",
        available: "Disponible",
        image: "/src/assets/images/home.jpg"
    },
];

export default function RecommededHome() {
    return (
        <div className="recommended-home-title" >
            <div className="see-all" style={{ marginBottom: "20px",width:'fit-content' }}>Voir tout</div>
            <div className="all-recommended-home">
                {recommendedHomes.map((home) => (
                    <div className="recommended-home" key={home.id}>
                        <div className="image" style={{ backgroundImage: `url('${home.image}')` }}>
                            <div className="info">
                                <div className="type">{home.type}</div>
                                <div className="favorite">
                                    <Heart size={18} strokeWidth={2.4} />
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <div className="title-price">
                                <div className="title">
                                    {truncateString(home.title, 30)}
                                </div>
                                <div className="price">{home.price}</div>
                            </div>
                            <div className="location">
                                <MapPin size={20} className="icon" />
                                <div>{truncateString(home.location,40)}</div>
                            </div>
                            <div className="details">
                                <div className="rooms">
                                    <div>{home.rooms}</div>
                                    <Dot strokeWidth={4} />
                                    <div>{home.bathrooms}</div>
                                </div>
                                <div className="available">
                                    {home.available}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                

            </div>
        </div>
    );
}
