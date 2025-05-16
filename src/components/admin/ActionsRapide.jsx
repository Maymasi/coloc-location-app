import { UserCheck, Flag, AlertTriangle } from 'lucide-react';

export default function ActionsRapide() {
    const actions = [
        {
            icon: <UserCheck color="#3f51b5" size={28} />,
            title: 'Vérifier les utilisateurs',
            description: 'Vérifiez les nouveaux comptes utilisateurs et approuvez leur statut vérifié.',
            badge: '5 utilisateurs en attente',
            badgeClass: 'badge-attente',
            bgColor: '#e8f0fe',
        },
        {
            icon: <Flag color="#e53935" size={28} />,
            title: 'Modérer les signalements',
            description: 'Examinez et traitez les signalements de contenu inapproprié ou frauduleux.',
            badge: '8 signalements en attente',
            badgeClass: 'badge-attente',
            bgColor: '#fdecea',
        },
        {
            icon: <AlertTriangle color="#f9a825" size={28} />,
            title: 'Alertes système',
            description: 'Consultez les alertes système et résolvez les problèmes techniques.',
            badge: '3 alertes actives',
            badgeClass: 'badge-attente',
            bgColor: '#fff8e1',
        },
    ];

    return (
        <div className="actions-rapides-dashboard">
        {actions.map((action, index) => (
        <div key={index} className="action-card">
            <div className="action-icon" style={{ backgroundColor: action.bgColor }}>
            {action.icon}
            </div>
            <div className="action-title">{action.title}</div>
            <div className="action-description">{action.description}</div>
            <div className={action.badgeClass}>{action.badge}</div>
        </div>
        ))}
        </div>
    );
}