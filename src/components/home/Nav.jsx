import { useState, useEffect } from "react";
import { Menu, Home, Megaphone, Info, CircleHelp, X } from 'lucide-react';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import "../../assets/styles/styleHome.css";
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [connected, setConnected] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setConnected(true);
    }, []);

    const getDashboardLink = () => {
        if (!user || !user.role) return null;
        if (user.role === "Proprietaire") return { path: "/owner", label: "Espace Propriétaire" };
        if (user.role === "Etudiant") return { path: "/student", label: "Espace Étudiant" };
        return null;
    };

    const dashboard = getDashboardLink();

    return (
        <div className="navParent">
            <div className={`ParentMenu ${open ? "fixedMenu" : ""}`}>
                <div className="MenuRespo">
                    <img src="/Logo.png" style={{ width: "95px" }} />
                    {
                        open
                            ? <X className="btnM" size={"50px"} onClick={() => setOpen(false)} />
                            : <Menu size={"50px"} className="btnM" onClick={() => setOpen(true)} />
                    }
                </div>
                <ul className="ListMenu" style={{ display: open ? "flex" : "none" }}>
                    <li className="lia"><Home /><a href="/">Accueil</a></li>
                    <li className="lia"><Megaphone /><a href="/annonces">Annonces</a></li>

                    {connected && dashboard && (
                        <li className="lia">
                            <a href={dashboard.path}>{dashboard.label}</a>
                        </li>
                    )}

                    <li className="lia"><Info /><a href="/aboutUs">À propos</a></li>
                    <li className="lia"><CircleHelp /><a href="/FAQ">FAQ</a></li>

                    <div className="btnMenu">
                        <li>
                            <a href="/Login" className="connexionContainer connexionConMenu" style={{ display: connected ? "none" : "flex" }}>
                                <LoginIcon className="loginIcon" sx={{ fontSize: "25px" }} />
                                <button className="btn-outline" style={{ fontSize: "15px" }}>Connexion</button>
                            </a>
                        </li>
                        <li>
                            <a href="/register" className="inscripContainer inscripConMenu" style={{ display: connected ? "none" : "flex" }}>
                                <UserPlus className="signIcon" style={{ color: "rgb(250, 244, 244)" }} sx={{ fontSize: "25px" }} />
                                <button className="btn-filled" style={{ fontSize: "15px" }}>Inscription</button>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>

            <ul className="ListNav">
                <li>
                    <a href="/">
                        <img src="/Logo.png" style={{ width: "70px" }} />
                    </a>
                </li>
                <li><a href="/">Accueil</a></li>
                <li><a href="/annonces">Annonces</a></li>

                {connected && dashboard && (
                    <li><a href={dashboard.path}>{dashboard.label}</a></li>
                )}

                <li><a href="/aboutUs">À propos</a></li>
                <li><a href="/FAQ">FAQ</a></li>
                <li className="searchBox">
                    <div className="searchContainer">
                        <SearchIcon style={{ color: "#888", fontSize: "22px" }} />
                        <input type="text" placeholder="Rechercher..." />
                    </div>
                </li>

                <li style={{ display: "flex", gap: "15px" }}>
                    <li>
                        <a href="/Login" className="connexionContainer" style={{ display: connected ? "none" : "flex" }}>
                            <LoginIcon className="loginIcon" sx={{ fontSize: "17px" }} />
                            <button className="btn-outline" style={{ fontSize: "13px", cursor: "pointer" }}>Connexion</button>
                        </a>
                    </li>
                    <li>
                        <a href="/register" className="inscripContainer" style={{ display: connected ? "none" : "flex" }}>
                            <UserPlus className="signIcon" style={{ color: "rgb(250, 244, 244)" }} size={17} />
                            <button className="btn-filled" style={{ fontSize: "13px" }}>Inscription</button>
                        </a>
                    </li>
                </li>
            </ul>
        </div>
    );
}
