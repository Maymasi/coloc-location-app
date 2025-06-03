import DashboardCardProperty from './DashboardCardProperty';
import AddPropertyCard from './AddPropertyCard';
export default function DashboardProperties() {
    return (
        <div className="dashboard-properties" >
             <DashboardCardProperty />
            <DashboardCardProperty />   
            <DashboardCardProperty /> 
            <AddPropertyCard />
        </div>
    );
}