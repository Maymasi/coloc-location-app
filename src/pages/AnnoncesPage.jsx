import PropertiesFound from "../components/common/Annonces/PropertiesFound";
import SearchHouse from "../components/common/Annonces/SearchHouse";
export default function AnnoncesPage(){

    return(
        <div className="annoncesParent">
            <SearchHouse/>
            <PropertiesFound />
        </div>
    );
}