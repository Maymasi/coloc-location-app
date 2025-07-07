import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function FindStudent(){
    const navigate = useNavigate();
    return(
        <div className='findContainer' style={{display:"flex",flexDirection:"column",height:"40vh",justifyContent:"center",gap:"20px",alignItems:"center",backgroundColor:"rgb(247 247 247 / 86%)",padding:"150px 0px"}}>
            <div className='findTitle' style={{color:"#fe7364",fontSize:"34px",fontWeight:"650"}}>Trouvez votre logement étudiant idéal</div>
            <div style={{fontSize:"16px",color:"#868686"}}>Recherchez parmi des milliers de logements étudiants vérifiés près de votre campus</div>
            <div className="searchBar">
                <Search size={"20px"}/>
                <input className='inputSearch' style={{border:"none",width:"80%"}} placeholder='rechercher par université, ville ou quartier...' type="text" />
                <button className='searchBtn' style={{border:"none",backgroundColor:"#fe7364",color:"white",padding:"10px 16px",width:"fit-content",borderRadius:"9999px",fontSize:"15px",cursor:"pointer"}} onClick={() => navigate("/Login")}>Rechercher</button>
            </div>
        </div>
    );
}
