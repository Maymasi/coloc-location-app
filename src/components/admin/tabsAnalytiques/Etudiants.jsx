import { School, Users, Percent, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function Etudiants({data}) {

  const [budgetData] = useState([
    { range: '< 400€', pourcentage: '18%' },
    { range: '400€ - 600€', pourcentage: '42%' },
    { range: '600€ - 800€', pourcentage: '28%' },
    { range: '> 800€', pourcentage: '12%' },
  ]);

  const hasEtudiants = data.repartitionEtudiantsParEtablissements.$values && data.repartitionEtudiantsParEtablissements.$values.length > 0;

  return (
    <div className="container-etudiants">
      <div className="card-etudiants">
        <div className="title-card-etudiants">
          <School size={18} color="#3d5afe" />
          <h4>Répartition par établissement</h4>
        </div>
        <div className="content-card-etudiants">
          {hasEtudiants ? (
            data.repartitionEtudiantsParEtablissements.$values.map((item, idx) => (
              <div className="item-repartition" key={idx}>
                <div className="txt-item-repartition">{item.etablissement}</div>
                <div className="numb-item-repartition">{item.nombreEtudiants}</div>
              </div>
            ))
          ) : (
            <div className="no-etudiants" style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'column',
              padding: '20px',
              textAlign: 'center',
              color: '#666'
            }}>
              <GraduationCap size={32} color='#3d5afe' style={{marginBottom: '8px'}} />
              <span style={{fontSize: '14px', fontWeight: '500'}}>Aucun étudiant inscrit</span>
              <span style={{fontSize: '12px', color: '#999', marginTop: '4px'}}>Les données apparaîtront ici</span>
            </div>
          )}
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
            <span className="active-green">{data.demandeActives}</span>
          </div>
          <div className="item-coloc">
            <span>Matchs réussis</span>
            <span className="match-blue">{data.matchReussis}</span>
          </div>
          <div className="item-coloc">
            <span>Taux de réussite</span>
            <span className="taux-purple">{data.tauxDeReussite}</span>
          </div>
        </div>
      </div>

      <div className="card-etudiants">
        <div className="title-card-etudiants">
          <Percent size={18} color="#9c27b0" />
          <h4>Budget des étudiants</h4>
        </div>
        <div className="content-card-etudiants">
          {data.repartitionBudgetEtudiants.$values.map((item, idx) => (
            <div className="item-budget" key={idx}>
              <span>{item.tranche}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: item.pourcentage + "%" }}></div>
              </div>
              <span className="pourcentage-budget">{item.pourcentage.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}