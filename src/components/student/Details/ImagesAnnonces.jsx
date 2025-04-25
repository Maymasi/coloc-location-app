import "../../../assets/styles/styleDetails.css";
export default function ImagesAnnonces(){
    return(
        <div className="imagesAnnoncesContainer">
            <div className="principaleImage">
                {/* <div>hh</div> */}
                <img  src="/principalImg.jfif" alt="" />
            </div>
            <div className="autresImages">
                {/* <div>g</div>
                <div>g</div>
                <div>k</div> */}
                <div>
                    <img src="/autresImg.jfif" alt="" />                   
                </div>
                <div>
                    <img src="/autresImg.jfif" alt="" />                   
                </div>
                <div>
                    <img src="/autresImg.jfif" alt="" />                   
                </div>
            </div>
        </div>
    )
}