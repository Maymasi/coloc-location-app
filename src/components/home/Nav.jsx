import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import "../../assets/styles/styleHome.css"
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { UserPlus } from 'lucide-react';
export default function Nav(){
    return(
        <>
            <ul className="ListNav">
                <li>
                <img src="/Logo.png" style={{ width: "100px" }} />
                </li>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Annonces</a></li>
                <li><a href="#">À propos</a></li>
                <li><a href="#">FAQ</a></li>
                <li className="searchBox">
                    <div className="searchContainer">
                        <SearchIcon style={{ color: "#888", fontSize: "20px" }} />
                        <input type="text" placeholder="Rechercher..." />
                    </div>
                </li>
                <li>
                    <a href="#" className="connexionContainer">
                        <LoginIcon className="loginIcon"/>
                        <button className="btn-outline">Connexion</button>
                    </a>
                </li>
                <li>
                    <a href="#" className="inscripContainer">
                            <UserPlus className="signIcon" style={{color:" rgb(250, 244, 244)"}}/>
                            <button  className="btn-filled">Inscription</button>
                    </a>
                </li>
            </ul>
        </>
    );
}