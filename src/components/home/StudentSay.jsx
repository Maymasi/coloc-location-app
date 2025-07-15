import Rating from '@mui/material/Rating';
import { Quote } from 'lucide-react';

export default function StudentSay() {
  var StudentsSay = [
    {
      img: "/profile2.jpg",
      Name: "Youssef Amrani",
      specialite: "Étudiant en Génie Informatique",
      school: "EMI",
      evaliuation: "5",
      opinion: "Super plateforme ! J'ai trouvé une colocation tranquille à 5 min du campus."
    },
    {
      img: "/profile1.jpg",
      Name: "Sara Benjelloun",
      specialite: "Étudiante en Management",
      school: "HEM Casablanca",
      evaliuation: "4",
      opinion: "Service fiable et rassurant. Tout est bien vérifié, ça m’a aidée à me décider vite."
    },
    {
      img: "/profile4.jpg",
      Name: "Amine Kabbaj",
      specialite: "Étudiant en Architecture",
      school: "ENA Marrakech",
      evaliuation: "5",
      opinion: "J’ai trouvé une coloc sympa à deux pas de l’école. Le matching est top !"
    },
    {
      img: "/profile3.jpg",
      Name: "Nisrine Ait Lhaj",
      specialite: "Étudiante en Médecine",
      school: "Faculté de Médecine Rabat",
      evaliuation: "4",
      opinion: "Très pratique pour trouver un appart proche et des colocataires sérieux."
    },
    {
      img: "/profile3.jpg",
      Name: "Omar Bourkia",
      specialite: "Étudiant en Informatique",
      school: "UM6P Benguerir",
      evaliuation: "5",
      opinion: "Témoignages vérifiés et visites virtuelles. J’ai trouvé vite un bon logement."
    },
    {
      img: "/profile3.jpg",
      Name: "Fatima Zahra Lahlou",
      specialite: "Étudiante en Droit",
      school: "Université Hassan II",
      evaliuation: "4",
      opinion: "Simple et sécurisé ! J’ai trouvé un studio près de ma fac en quelques jours."
    }
  ];

  return (
    <div
      className="sayContainer"
      style={{
        backgroundColor: "rgb(250 250 250 / 68%)",
        margin: "80px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 10px",
      }}
    >
      <div className="bigTitle">Ce que disent nos étudiants</div>
      <div className="shortDescrip">
        Découvrez les avis d'étudiants qui ont trouvé leur logement et leurs colocataires grâce à ColocMeak
      </div>
      <div className="Says">
        {StudentsSay.map((student, index) => (
          <div className="sayCard" key={index}>
            <div className="topSayCard">
              <div className="picProfile">
                <img className="pic" src={student.img} alt="profil étudiant" />
              </div>
              <div className="infoStudent">
                <div className="NameStudent">{student.Name}</div>
                <div className="Specialite">{student.specialite}</div>
                <div className="school">{student.school}</div>
              </div>
              <div className="evaluationk">
                <Rating
                  name="read-only"
                  value={Number(student.evaliuation)}
                  readOnly
                />
              </div>
            </div>
            <div className="text">
              <div className="virguleTop">
                <Quote
                  style={{
                    transform: "rotate(180deg)",
                    color: "#fde3e3",
                    fontSize: "32px",
                  }}
                />
              </div>
              <div
                className="contentText"
                style={{
                  minHeight: "50px", // force une hauteur minimum similaire
                }}
              >
                {student.opinion}
              </div>
              <div className="virguleBottom">
                <Quote
                  style={{ color: "#fde3e3", fontSize: "32px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
