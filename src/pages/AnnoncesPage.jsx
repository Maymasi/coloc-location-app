import PropertiesFound from "../components/common/Annonces/PropertiesFound";
import SearchHouse from "../components/common/Annonces/SearchHouse";
import {useState} from "react" ;
import {basicFilter} from "../Services/AnnonceService";
export default function AnnoncesPage(){
    const [filtredAnnonces, setFiltredAnnonces] = useState([]);
    const handelBasicFilter =async (filters)=>{
        console.log(filters);
        const results = await basicFilter(
            filters.ville,
            filters.propertyType,
            filters.minPrice
        )
        console.log(results)
        setFiltredAnnonces(results)
    }
    return(
        <div className="annoncesParent">
            <SearchHouse OnSearch={handelBasicFilter}/>
            <PropertiesFound annonces={filtredAnnonces}/>
        </div>
    );
}