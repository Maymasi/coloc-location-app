import { Search, UsersRound, House, MoveRight } from 'lucide-react';

export default function SimpleProcess(){
    return(
        <div className='simpleProcessContainer' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px",background:"linear-gradient(rgb(253 247 247), rgb(255 254 254))",paddingTop:"25px"}}>
            <div className="litleTitle">Processus Simple</div>
            <div className="bigTitle">Comment fonctionne ColocMeak</div>
            <div className="shortDescrip">Trouver votre logement étudiant idéal et des colocataires compatibles est facile grâce à notre processus en trois étapes</div>
            <div className="cards">
                <div className="processCard bleuCard">
                <div className="iconWrapper">
                    <div className="iconProcessCard">
                        <Search size={30} />
                    </div>
                    <div className="badgeNotif">1</div>
                </div>
                    <div className='titleProcessCard'>Rechercher des logements</div>
                    <div className='descripProcessCard'>Parcourez des logements étudiants vérifiés près de votre campus. Filtrez par prix, localisation et équipements.</div>
                </div>
                <div className="processCard pinkCard">
                    <div className="iconWrapper">
                        <div className="iconProcessCard">
                            <UsersRound size={30}/>
                        </div>
                        <div className="badgeNotif">2</div>
                    </div>
                    <div className='titleProcessCard'>Trouver des colocataires</div>
                    <div className='descripProcessCard'>Utilisez notre système de correspondance pour trouver des colocataires compatibles selon votre mode de vie et vos préférences.</div>
                </div>
                <div className="processCard bleuCard">
                    <div className="iconWrapper">
                        <div className="iconProcessCard">
                            <House size={30}/>
                        </div>
                        <div className="badgeNotif">3</div>
                    </div>
                    <div className='titleProcessCard'>Emménager</div>
                    <div className='descripProcessCard'>Planifiez vos visites, signez votre bail en ligne et emménagez dans votre logement étudiant idéal.</div>
                </div>
            </div>
            <div className='startSearch' style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"7px",cursor: "pointer"}}>
                <a style={{color:"#fe7364",fontSize:"16px",margin:"50px 0px"}} href='/annonces'>Commencez votre recherche dès aujourd’hui</a>
                <MoveRight size={18} color='#fe7364'/>
            </div>
        </div>
    );
}
