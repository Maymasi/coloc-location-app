import { Search,UsersRound,House,MoveRight  } from 'lucide-react';

export default function SimpleProcess(){
    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px",background:"linear-gradient(rgb(253 247 247), rgb(255 254 254))",paddingTop:"25px"}}>
            <div className="litleTitle">Simple Process</div>
            <div className="bigTitle">How CampusHaven Works</div>
            <div className="shortDescrip">Finding your perfect student housing and roommates is easy with our simple three-step process</div>
            <div className="cards">
                <div className="processCard bleuCard">
                <div className="iconWrapper">
                    <div className="iconProcessCard">
                        <Search size={30} />
                    </div>
                    <div className="badgeNotif">1</div>
                </div>
                    <div className='titleProcessCard'>Search Properties</div>
                    <div className='descripProcessCard'>Browse verified student housing options near your campus. Filter by price, location, and amenities.</div>
                </div>
                <div className="processCard pinkCard">
                    <div className="iconWrapper">
                        <div className="iconProcessCard">
                            <UsersRound size={30}/>
                        </div>
                        <div className="badgeNotif">2</div>
                    </div>
                    <div className='titleProcessCard'>Find Roommates</div>
                    <div className='descripProcessCard'>Use our matching system to find compatible roommates based on your lifestyle and preferences.</div>
                </div>
                <div className="processCard bleuCard">
                    <div className="iconWrapper">
                        <div className="iconProcessCard">
                            <House size={30}/>
                        </div>
                        <div className="badgeNotif">3</div>
                    </div>
                    <div className='titleProcessCard'>Move In</div>
                    <div className='descripProcessCard'>Schedule viewings, sign your lease online, and move into your perfect student housing.</div>
                </div>
            </div>
            <div className='startSearch' style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"7px",cursor: "pointer"}}>
                <a style={{color:"#fe7364",fontSize:"16px",margin:"50px 0px"}}>Start your search today</a>
                <MoveRight size={18} color='#fe7364'/>
            </div>
        </div>
    );
}