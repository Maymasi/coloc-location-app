import "../../../assets/styles/styleDetails.css";
export default function ImagesAnnonces({annonce}){
    return(
        <div className="imagesAnnoncesContainer">
            <div className="principaleImage">
                <img  src={annonce.photos.$values[0].url} alt="" />
            </div>
            <div className="autresImages">
                <div>
                    <img src={annonce.photos.$values[1].url}alt="" />                   
                </div>
                <div>
                    <img src={annonce.photos.$values[2].url}alt="" />                   
                </div>
                <div>
                    <img src={annonce.photos.$values[3].url}alt="" />                   
                </div>
            </div>
        </div>
    )
}