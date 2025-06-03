import { School, Users, Percent } from 'lucide-react';
import { useState } from 'react';

export default function Etudiants() {
  const [repartitionData] = useState([
    { name: 'Université Paris-Saclay', count: 1245 },
    { name: 'Sorbonne Université', count: 987 },
    { name: 'Université de Lyon', count: 854 },
    { name: 'Université de Toulouse', count: 712 },
    { name: 'Autres établissements', count: 4628 },
  ]);

  const [colocData] = useState({
    demandes: 487,
    matchs: 312,
    taux: '64%',
    delai: '18 jours',
  });

  const [budgetData] = useState([
    { range: '< 400€', pourcentage: '18%' },
    { range: '400€ - 600€', pourcentage: '42%' },
    { range: '600€ - 800€', pourcentage: '28%' },
    { range: '> 800€', pourcentage: '12%' },
  ]);

  return (
    <div className="container-etudiants">
      <div className="card-etudiants">
        <div className="title-card-etudiants">
          <School size={18} color="#3d5afe" />
          <h4>Répartition par établissement</h4>
        </div>
        <div className="content-card-etudiants">
          {repartitionData.map((item, idx) => (
            <div className="item-repartition" key={idx}>
              <div className="txt-item-repartition">{item.name}</div>
              <div className="numb-item-repartition">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-etudiants">
        <div className="title-card-etudiants">
          <Users size={18} color="#00C896" />
          <h4>Recherche de colocataires</h4>
        </div>
        <div className="content-card-etudiants">
          <div className="item-coloc">
            <span>Demandes actives</span>
            <span className="active-green">{colocData.demandes}</span>
          </div>
          <div className="item-coloc">
            <span>Matchs réussis</span>
            <span className="match-blue">{colocData.matchs}</span>
          </div>
          <div className="item-coloc">
            <span>Taux de réussite</span>
            <span className="taux-purple">{colocData.taux}</span>
          </div>
          <div className="temps-coloc">
            <span>Temps moyen pour trouver</span>
            <h3>{colocData.delai}</h3>
          </div>
        </div>
      </div>

      <div className="card-etudiants">
        <div className="title-card-etudiants">
          <Percent size={18} color="#9c27b0" />
          <h4>Budget des étudiants</h4>
        </div>
        <div className="content-card-etudiants">
          {budgetData.map((item, idx) => (
            <div className="item-budget" key={idx}>
              <span>{item.range}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: item.pourcentage }}></div>
              </div>
              <span className="pourcentage-budget">{item.pourcentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}