import { useState,useEffect } from "react";
import { Menu, Home ,Megaphone,Info,CircleHelp,X} from 'lucide-react';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import "../../assets/styles/styleHome.css";
import { UserPlus } from 'lucide-react';
export default function Nav(){
    const [open,setOpen]=useState(false);
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);
    return(
        <div className="navParent">
            <div className={`ParentMenu ${open ? "fixedMenu" : ""}`}>
                <div className="MenuRespo" >
                    <img src="/Logo.png" style={{width:"95px"}} />
                    {
                        open ? <X className="btnM" size={"50px"} onClick={()=>setOpen(false)}/> : <Menu size={"50px"} className="btnM" onClick={()=>setOpen(true)}/>
                    }
                </div>
                <ul className="ListMenu" style={{display:open?"flex":"none"}}>
                    <li className="lia">
                        <Home/>
                        <a href="/">Accueil</a>
                    </li>
                    <li className="lia">
                        <Megaphone />
                        <a href="/annonces">Annonces</a>
                    </li>
                    <li className="lia">
                        <Info />
                        <a href="/aboutUs">À propos</a>
                    </li>
                    <li className="lia">
                        <CircleHelp />
                        <a href="/FAQ">FAQ</a>
                    </li>
                    <div className="btnMenu">
                        <li>
                            <a href="#" className="connexionContainer connexionConMenu">
                                <LoginIcon className="loginIcon" sx={{fontSize:"25px"}}/>
                                <button className="btn-outline" style={{fontSize:"15px"}}>Connexion</button>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="inscripContainer inscripConMenu">
                                    <UserPlus className="signIcon" style={{color:" rgb(250, 244, 244)"}} sx={{fontSize:"25px"}}/>
                                    <button  className="btn-filled" style={{fontSize:"15px"}}>Inscription</button>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
            <ul className="ListNav">
                <li >
                    <a href="/">
                        <img src="/Logo.png" style={{ width: "100px" }} />
                    </a>
                </li>
                <li><a href="/">Accueil</a></li>
                <li><a href="/annonces">Annonces</a></li>
                <li><a href="/aboutUs">À propos</a></li>
                <li><a href="/FAQ">FAQ</a></li>
                <li className="searchBox">
                    <div className="searchContainer">
                        <SearchIcon style={{ color: "#888", fontSize: "25px" }} />
                        <input type="text" placeholder="Rechercher..." />
                    </div>
                </li>
                <li>
                    <a href="#" className="connexionContainer">
                        <LoginIcon className="loginIcon" sx={{fontSize:"25px"}}/>
                        <button className="btn-outline" style={{fontSize:"13px"}}>Connexion</button>
                    </a>
                </li>
                <li>
                    <a href="#" className="inscripContainer">
                            <UserPlus className="signIcon" style={{color:" rgb(250, 244, 244)"}} sx={{fontSize:"25px"}}/>
                            <button  className="btn-filled" style={{fontSize:"13px"}}>Inscription</button>
                    </a>
                </li>
            </ul>
        </div>
    );
}