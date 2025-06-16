import PropertiesFound from "../components/common/Annonces/PropertiesFound";
import SearchHouse from "../components/common/Annonces/SearchHouse";
import {useState} from "react" ;
import {basicFilter} from "../Services/AnnonceService";
export default function AnnoncesPage(){
    const [filtredAnnonces,SetFiltredAnnonces] = useState([]);
    const [basic , setBasic] = useState(false);
    const handelBasicFilter =async  (filters)=>{
        const results = await basicFilter(
            filters.ville,
            filters.propertyType,
            filters.minPrice
        )
        SetFiltredAnnonces(results)
        setBasic(true);
    }
    return(
        <div className="annoncesParent">
            <SearchHouse OnSearch={handelBasicFilter}/>
            <PropertiesFound annonces={filtredAnnonces} isBasic={basic}/>
        </div>
    );
}