import { Search } from 'lucide-react';
export default function FindStudent(){
    return(
        <div style={{display:"flex",flexDirection:"column",height:"40vh",justifyContent:"center",gap:"20px",alignItems:"center",backgroundColor:"#ededed",padding:"100px 0px"}}>
            <div style={{color:"#fe7364",fontSize:"34px",fontWeight:"650"}}>Find Your Perfect Student Housing</div>
            <div style={{fontSize:"16px",color:"#868686"}}>Search from thousands of verified student accommodations near your campus</div>
            <div className="searchBar">
                <Search size={"20px"}/>
                <input className='inputSearch' style={{border:"none",width:"80%"}} placeholder='search by university, city, or neighborhood...' type="text" />
                <button className='searchBtn' style={{border:"none",backgroundColor:"#fe7364",color:"white",padding:"10px",width:"90px",borderRadius:"9999px",fontSize:"15px"}}>Search</button>
            </div>
        </div>
    );
}