import PropertiesFound from "../components/common/Annonces/PropertiesFound";
import SearchHouse from "../components/common/Annonces/SearchHouse";
import Nav from "../components/home/Nav";
export default function AnnoncesPage(){

    return(
        <div className="annoncesParent">
            <Nav />
            <SearchHouse/>
            <PropertiesFound />
        </div>
    );
}