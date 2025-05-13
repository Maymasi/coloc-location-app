import Rating from '@mui/material/Rating';
import { Quote } from 'lucide-react';
export default function StudentSay(){
    var StudentsSay = [
        {img:"/ProfilPicture.jfif",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."},
        {img:"/ProfilPicture.jfif",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."},
        {img:"",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."},
        {img:"/ProfilPicture.jfif",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."},
        {img:"/ProfilPicture.jfif",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."},
        {img:"/ProfilPicture.jfif",Name:"David Rodriguez",specialite:"Computer Science Student",school:"Tech University",evaliuation:"4",opinion:"The virtual tours saved me so much time! I was able to view multiple properties without leaving my dorm. Found an amazing apartment with three other business majors through the roommate matching feature."}
    ]
    return (
        <div className='sayContainer' style={{backgroundColor:"rgb(250 250 250 / 68%)",margin:"80px 0px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"40px 10px"}}>
            <div className="bigTitle">What Our Students Say</div>
            <div className="shortDescrip">Hear from students who found their perfect housing and roommates through CampusHaven</div>           
            <div className="Says">
                {
                    StudentsSay.map((student)=>{
                        return(
                            <div className="sayCard">
                                <div className="topSayCard">
                                    <div className="picProfile">
                                        <img className='pic' src={student.img}/>
                                    </div>
                                    <div className="infoStudent">
                                            <div className="NameStudent">{student.Name}</div>
                                            <div className="Specialite">{student.specialite}</div>
                                            <div className="school">{student.school}</div>
                                    </div>
                                    <div className="evaluationk"><Rating name="read-only" value={student.evaliuation} readOnly/></div>
                                </div>
                                <div className="text">
                                    <div className="virguleTop"><Quote style={{ transform: "rotate(180deg)", color: "#fde3e3", fontSize: "32px" }}/></div>
                                    <div className="contentText">{student.opinion}</div>
                                    <div className="virguleBottom"><Quote style={{color: "#fde3e3", fontSize: "32px" }} /></div>
                                </div>
                            </div>  
                        );
                    })
                }                   
            </div>          
        </div>
    );
}