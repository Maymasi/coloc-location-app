import { House,UsersRound,Building2  } from 'lucide-react';
export default function WhyChose(){
    return (
        <div className='whyContainer' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px",background:"linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 252, 252))",margin:"70px 0px"}}>
            <div className="bigTitle">Why Choose CampusHaven</div>
            <div className="shortDescrip">We make finding student housing and roommates simple, safe, and stress-free</div>
            <div className="cards" >
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="0">
                    <div className="iconCard">
                        <House/>
                    </div>
                    <div className="titleProcessCard">Verified Listings</div>
                    <div className="descripProcessCard">All properties are thoroughly verified to ensure quality, safety, and accuracy of information.</div>
                </div>
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="150">
                    <div className="iconCard">
                        <UsersRound/>
                    </div>
                    <div className="titleProcessCard">Roommate Matching</div>
                    <div className="descripProcessCard">Our intelligent matching system helps you find compatible roommates based on lifestyle and preferences.</div>
                </div>
                <div className="cardHome whycard" data-aos="fade-up" data-aos-delay="300">
                    <div className="iconCard">
                        <Building2 />
                    </div>
                    <div className="titleProcessCard">Campus Proximity</div>
                    <div className="descripProcessCard">Find housing options strategically located near educational institutions and student amenities.</div>
                </div>
            </div>
        </div>
    );
}