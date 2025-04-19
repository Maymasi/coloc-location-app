import { Mail } from 'lucide-react';
import Button from '@mui/material/Button';
export default function JoinNewsletter(){
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div 
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
                    <div className="titleJoin" style={{color:"#fa8173e2",backgroundColor:"#ffd5d090",borderRadius:"9999px",padding:"5px",width:"120px"}}>Stay Updated</div>
                    <div style={{fontSize:"24px",fontWeight:"700"}}>Join Our Newsletter</div>
                    <div style={{textAlign:"start",color:"#757575",fontSize:"15px"}}>Get exclusive property alerts, roommate matching tips, and student housing guides delivered to your inbox.</div>
                    <div className="inputEmail">
                        <Mail color='#9e9e9e' size={"23px"}/>
                        <input style={{border:"none",width:"100%",fontSize:"15px"}} placeholder='Your email address' type="Email" />
                    </div>
                    <Button variant="contained" style={{width:"340px",borderRadius:"11px",height:"37px",fontSize:"15px",textTransform:"none",backgroundColor:"#fe7364"}}>Subscribe</Button>
                    <div style={{fontSize:"12px",color:"#757575"}}>We respect your privacy. Unsubscribe at any time.</div>
                </div>
                <div className="rightSideJoin">
                    <Mail style={{color:"rgb(251, 133, 122)",backgroundColor:"rgba(251, 206, 201, 0.8)",padding:"24px",width:"90px",height:"90px",borderRadius:"50%"}}/>
                </div>
            </div>
        </div>
    );
}