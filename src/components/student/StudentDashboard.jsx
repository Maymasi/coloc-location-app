import React from 'react';
import { Home,Users } from 'lucide-react';
import '../../assets/styles/userCss/dashbordStudent.css';
export default function StudentDashboard() {
return (
    <div>
            <header>
                    <div className="info-student">
                            <h1>Bienvenue, Oussama</h1>
                            <p>Gérez vos recherches de logement et vos demandes de colocation</p>
                    </div>
                    <div className="links">
                            <div className="homes">
                                    <Home className='icon'/>
                                    <div>Parcourir les propriétés</div>
                            </div>
                            <div className="colocations">
                                    <Users className='icon'/>
                                    <div>Trouver des colocataires</div>
                            </div>
                    </div>
            </header>
            <div className="data-student">
                    <div className="card">
                            <div className="content">
                                    <div className="title">Propriétés enregistrées</div>
                                    <div className="number">3</div>
                            </div>
                            <div className="icon"></div>
                    </div>
                    <div className="card">
                            <div className="content">
                                    <div className="title">Messages non lus</div>
                                    <div className="number">5</div>
                            </div>
                            <div className="icon"></div>
                    </div>
                    <div className="card">
                            <div className="content">
                                    <div className="title">Demandes de colocataires</div>
                                    <div className="number">8</div>
                            </div>
                            <div className="icon"></div>
                    </div>
                    <div className="card">
                            <div className="content">
                                    <div className="title">Vues de la propriété</div>
                                    <div className="number">12</div>
                            </div>
                            <div className="icon"></div>
                    </div>
            </div>
    </div>
);
}