import { Mail } from 'lucide-react';
import Button from '@mui/material/Button';
export default function JoinNewsletter(){
    return(
        <div className='joinContainer' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div data-aos="zoom-out" className='cardJoin'
            style={{
                display:"flex",
                justifyContent:"space-between",
                width:"50vw",
                background:"linear-gradient(90deg, rgb(255 248 248) 16%, rgb(255 248 246) 61%, rgb(246 183 178 / 63%) 100%)",
                padding:"30px",
                borderRadius:"20px",
                boxShadow:"rgba(0, 0, 0, 0.1) 4px 4px 13px 4px"
                }}>
                <div className="leftSideJoin" style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"start",gap:"15px"}}>
                    <div className="titleJoin" style={{color:"#fa8173e2",backgroundColor:"#ffd5d090",borderRadius:"9999px",padding:"5px",width:"120px",textAlign:"center"}}>Restez informé</div>
                    <div style={{fontSize:"24px",fontWeight:"700"}}>Rejoignez notre newsletter</div>
                    <div style={{textAlign:"start",color:"#757575",fontSize:"15px"}}>Recevez des alertes exclusives sur les biens, des conseils pour trouver des colocataires</div>
                    <div className="inputEmail">
                        <Mail color='#9e9e9e' size={"23px"}/>
                        <input style={{border:"none",width:"100%",fontSize:"15px"}} placeholder='Votre adresse e-mail' type="Email" />
                    </div>
                    <Button className='joinbtn' variant="contained" style={{width:"340px",borderRadius:"11px",height:"37px",fontSize:"15px",textTransform:"none",backgroundColor:"#fe7364"}}>S’abonner</Button>
                    <div style={{fontSize:"12px",color:"#757575"}}>Nous respectons votre vie privée. Désabonnement à tout moment.</div>
                </div>
                <div className="rightSideJoin">
                    <Mail style={{color:"rgb(251, 133, 122)",backgroundColor:"rgba(251, 206, 201, 0.8)",padding:"24px",width:"90px",height:"90px",borderRadius:"50%"}}/>
                </div>
            </div>
        </div>
    );
}
