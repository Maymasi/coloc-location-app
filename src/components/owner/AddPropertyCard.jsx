import { useNavigate } from "react-router-dom";
export default function AddPropertyCard() {
    const Navigate=useNavigate();
    return (
        <div className="add-property-card" onClick={()=>Navigate('/owner/OwnerAddProperty')}>
            <div className="add-property-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                </svg>
            </div>
            
            <h3>Ajouter une nouvelle propriété</h3>
            
            <p>Proposez une nouvelle propriété à découvrir aux étudiants</p>
            
            <button className="add-property-btn">
                Ajouter une propriété
            </button>
        </div>
    );
}