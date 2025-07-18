import * as React from 'react';
import { MapPin,House,Flag,Info,Mail ,Heart,User,Bath,Grid2x2Plus,Phone,MessageSquare,Send,X,Calendar,Users,Clock} from 'lucide-react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import defaultAvatar from "../../../assets/images/defaultAvatar.jpg"
import {signalAnnonce} from '../../../Services/signalService';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import {AddFavorisAnnonce,getMyFavoris} from '../../../Services/AnnonceService';
import 'react-toastify/dist/ReactToastify.css';
import {envoyerDemandeLocation} from '../../../Services/DemandeDeLocationService';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function InformationAnnonces({annonce}){
    // states
    const [value, setValue] = React.useState(0);
    const [openSignal,setOpenSignal] = React.useState(false);
    const [openDemandeLocation, setOpenDemandeLocation] = React.useState(false);
    const [motif, setMotif] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [error, setError] = React.useState(false);
    const [isFavori, setIsFavori] = React.useState([]);
    //navigation
    const Navigate=useNavigate();
    
    // États pour le formulaire de demande de location
    const [demandeData, setDemandeData] = React.useState({
        message: "",
        dateEmmenagement: "",
        dureeSejour: "",
        nbOccupants: 1
    });
    const [demandeError, setDemandeError] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
      const fetchFavoris = async () => {
        try {
          const data = await getMyFavoris(); 
          const ids = data.$values.map(fav => fav.id); 
          console.log("ids :",ids)
          setIsFavori(ids);
        } catch (error) {
          console.error("Erreur lors du chargement des favoris :", error);
        }
      };
        fetchFavoris();
    }, []);    

    // handlers
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleOpenSignal = ()=>{
        setOpenSignal(true);
    }

    const handleCloseSignal = ()=>{
        setOpenSignal(false);
        setError(false);
        setMotif(""); 
        setDescription("");
    }
    const handleNavigateProfilOwner=()=>{
        Navigate(`/OwnerProfile/${annonce.proprietaire.id}`)
    }

    const handleSignal = ()=>{
        if(motif && description){
            signalAnnonce(annonce.id,motif,description)
                .then((res)=>{
                    console.log(res);
                    setMotif("");
                    setDescription("");
                    handleCloseSignal();
                    setError(false);
                })
                .catch((err)=>{
                    console.error(err);
                });
        }else{
            setError(true);
        }
    }

    // Handlers pour la demande de location
    const handleOpenDemandeLocation = () => {
       setOpenDemandeLocation(true);
       setDemandeError(false);
    }

    const handleCloseDemandeLocation = () => {
        setOpenDemandeLocation(false);
        setDemandeError(false);
        setDemandeData({
            message: "",
            dateEmmenagement: "",
            dureeSejour: "",
            nbOccupants: 1
        });
    }

    const handleDemandeInputChange = (field, value) => {
        setDemandeData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleSubmitDemande = async () => {
        // Validation des champs
        if (!demandeData.message || !demandeData.dateEmmenagement || !demandeData.dureeSejour || !demandeData.nbOccupants) {
            setDemandeError(true);
            return;
        }

        // Vérifier que la date d'emménagement est future
        const dateEmmenagement = new Date(demandeData.dateEmmenagement);
        const aujourdhui = new Date();
        if (dateEmmenagement <= aujourdhui) {
            toast.error("La date d'emménagement doit être future.");
            return;
        }

        // Vérifier que la durée de séjour est positive
        if (parseInt(demandeData.dureeSejour) <= 0) {
            toast.error("La durée de séjour doit être supérieure à 0.");
            return;
        }

        // Vérifier que le nombre d'occupants est positif
        if (parseInt(demandeData.nbOccupants) <= 0) {
            toast.error("Le nombre d'occupants doit être supérieur à 0.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await envoyerDemandeLocation({
                annonceId: annonce.id,
                message: demandeData.message,
                dateEmmenagement: demandeData.dateEmmenagement,
                dureeSejour: parseInt(demandeData.dureeSejour),
                nbOccupants: parseInt(demandeData.nbOccupants)
            });

            if (response.success) {
                toast.success(response.message || "Votre demande de location a été envoyée avec succès !");
                handleCloseDemandeLocation();
            } else {
                // Gestion des erreurs spécifiques
                if (response.status === 409) {
                    toast.error(response.error || "Une demande de location existe déjà pour cette annonce.");
                } else {
                    toast.error(response.error || "Erreur lors de l'envoi de la demande. Veuillez réessayer.");
                }
            }
        } catch (error) {
            console.error("Erreur inattendue lors de l'envoi de la demande :", error);
            toast.error("Une erreur inattendue s'est produite. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    }

    React.useEffect(()=>{
        document.body.style.overflow = (openSignal || openDemandeLocation) ? "hidden" : "auto";
    },[openSignal, openDemandeLocation])

    const typesApp = [
        {icn:House,title:"Type :",value:annonce.logement.type},
        {icn:User,title:"Chambres :",value:annonce.logement.nbChambres},
        {icn:Bath,title:"Salles de bain :",value:annonce.logement.nbSallesBain},
        {icn:Grid2x2Plus,title:"Superficie (m²) :",value:annonce.logement.surface}
    ]

    //format date
    const date = new Date(annonce.disponibleDe);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);

    const handelFavori = async (id) => {
        let newFavoris 
        var token = localStorage.getItem("token");
        if(token){
            const decoded = jwtDecode(token);
            const role = decoded.role;
              if(role !== 'Etudiant'){
                toast.error("Vous devez être connecté en tant qu'étudiant pour ajouter des favoris.");
                return;
              }else{
                let data=await AddFavorisAnnonce(id)
                newFavoris = [...isFavori,id]
                console.log(data)
              }
              setIsFavori(newFavoris)
        }
        else{
            toast.error("Vous devez être connecté pour ajouter des favoris.");
        }
    }

    const isAlreadyFavori = isFavori.includes(annonce.id);

    return(
        <div className='infoAnnoncesContainer'>
            <ToastContainer />
            {/* Overlay */}
            {(openSignal || openDemandeLocation) && (
                <div className="overlay" onClick={openSignal ? handleCloseSignal : handleCloseDemandeLocation}></div>
            )}
            
            {/* Modal Signal */}
            <div className="cardSignal" style={{display: openSignal?"flex":"none"}}>
                <Alert severity="info" sx={{display:error?"flex":"none"}}>Veuillez remplir tous les champs.</Alert>
                <div className="topCard">
                    <div className='titleCardSignal'>Signaler cette propriété</div>
                    <div className='discreptionCardSignal'>Veuillez nous indiquer pourquoi vous souhaitez signaler cette propriété. Votre signalement sera examiné par notre équipe.</div>
                </div>
                <FormControl sx={{display:"flex",gap:"8px"}}>
                    <div className='rsnSignal'>Raison du signalement</div>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={motif}
                        onChange={(e)=>setMotif(e.target.value)}
                    >
                        <FormControlLabel  value="Frauduleux" control={<Radio />} label="Contenu frauduleux ou trompeur" />
                        <FormControlLabel value="inapproprié" control={<Radio />} label="Contenu inapproprié" />
                        <FormControlLabel value="spam" control={<Radio />} label="Spam ou publicité" />
                        <FormControlLabel value="abusif" control={<Radio />} label="Harcèlement ou comportement abusif" />
                        <FormControlLabel value="other" control={<Radio />} label="Autre raison" />
                    </RadioGroup>
                </FormControl>
                <div className="areaSignal">
                    <label htmlFor="" className='titleArea'>Détails supplémentaires</label>
                    <textarea className='areaText' 
                        style={{border:"2px solid #e0e0e0",borderRadius:"12px",padding:"12px",fontSize:"12px",height:"80px"}} 
                        type="text" 
                        placeholder='veuillez fournir plus de details sur votre signalement...' 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>
                <div className="btnSignal">
                    <Button onClick={handleCloseSignal} variant="outlined" sx={{color:"black",borderColor:"#9e9e9e",textTransform:"none"}}>Annuler</Button>
                    <Button variant="contained" 
                        style={{backgroundColor:"#ff6b5c",width:"fit-content",textTransform:"none"}}
                        onClick={handleSignal}
                    >
                        Envoyer le signalement
                    </Button>
                </div>
            </div>

            {/* Modal Demande de Location */}
            <div className="cardSignal" style={{display: openDemandeLocation?"flex":"none", maxWidth: "500px"}}>
                <Alert severity="info" sx={{display:demandeError?"flex":"none"}}>Veuillez remplir tous les champs correctement.</Alert>
                
                <div className="topCard">
                    <div className='titleCardSignal'>Demande de location</div>
                    <div className='discreptionCardSignal'>Remplissez ce formulaire pour envoyer une demande de location au propriétaire.</div>
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: "16px", width: "100%"}}>
                    {/* Message */}
                    <div className="areaSignal">
                        <label htmlFor="" className='titleArea'>Message personnel</label>
                        <textarea 
                            className='areaText' 
                            style={{border:"2px solid #e0e0e0",borderRadius:"12px",padding:"12px",fontSize:"12px",height:"100px"}} 
                            placeholder='Présentez-vous et expliquez pourquoi vous êtes intéressé par cette propriété...' 
                            value={demandeData.message}
                            onChange={(e)=>handleDemandeInputChange('message', e.target.value)}
                        />
                    </div>

                    {/* Date d'emménagement */}
                    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <label className='titleArea'>Date d'emménagement souhaitée</label>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                            <Calendar size="16px" color="#757575" />
                            <input 
                                type="date"
                                style={{
                                    border:"2px solid #e0e0e0",
                                    borderRadius:"12px",
                                    padding:"12px",
                                    fontSize:"12px",
                                    width: "100%",
                                    outline: "none"
                                }}
                                value={demandeData.dateEmmenagement}
                                onChange={(e)=>handleDemandeInputChange('dateEmmenagement', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    {/* Durée de séjour */}
                    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <label className='titleArea'>Durée de séjour (en mois)</label>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                            <Clock size="16px" color="#757575" />
                            <input 
                                type="number"
                                min="1"
                                max="24"
                                style={{
                                    border:"2px solid #e0e0e0",
                                    borderRadius:"12px",
                                    padding:"12px",
                                    fontSize:"12px",
                                    width: "100%",
                                    outline: "none"
                                }}
                                placeholder="Ex: 6"
                                value={demandeData.dureeSejour}
                                onChange={(e)=>handleDemandeInputChange('dureeSejour', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Nombre d'occupants */}
                    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <label className='titleArea'>Nombre d'occupants</label>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                            <Users size="16px" color="#757575" />
                            <input 
                                type="number"
                                min="1"
                                max="10"
                                style={{
                                    border:"2px solid #e0e0e0",
                                    borderRadius:"12px",
                                    padding:"12px",
                                    fontSize:"12px",
                                    width: "100%",
                                    outline: "none"
                                }}
                                placeholder="Ex: 2"
                                value={demandeData.nbOccupants}
                                onChange={(e)=>handleDemandeInputChange('nbOccupants', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="btnSignal">
                    <Button 
                        onClick={handleCloseDemandeLocation} 
                        variant="outlined" 
                        sx={{color:"black",borderColor:"#9e9e9e",textTransform:"none"}}
                        disabled={isSubmitting}
                    >
                        Annuler
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{backgroundColor:"#ff6b5c",width:"fit-content",textTransform:"none"}}
                        onClick={handleSubmitDemande}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                    </Button>
                </div>
            </div>

            <div className="infoAnnonces">
                <div className="topInfo">
                    <div className="titleAdresse">
                        <div className="nameAppartment">{annonce.titre}</div>
                        <div className="adressApartment">
                                < MapPin className='iconInfo'/>
                                <div style={{fontWeight: "500"}}>{annonce.logement.adresse}</div>
                        </div>                        
                    </div>
                    <div className="priceAppartment">
                        <div className="prcAppartment">{annonce.prix}MAD</div>
                        <div className="available">Disponible à partir du {formatted}</div>
                    </div>
                </div>
                <div className="bodyAppartment">
                        <div className="caracAppartment">
                            {
                                typesApp.map((type, index)=>{
                                    return(
                                        <div key={index} className="typeApp">
                                            <div className="icnTypeApp">
                                                <type.icn color="#757575" size="18px"/>
                                            </div>
                                            <div className="valueTypeApp">
                                                <div style={{fontSize:"13px",color:"#757575"}}>{type.title}</div>
                                                <div>{type.value}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <Box sx={{ width: '100%' }} className="BoxInfoAappartment">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Description" {...a11yProps(0)} />
                                <Tab label="Commodités" {...a11yProps(1)} />
                                <Tab label="Localisation" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {annonce.description}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <ul className='listAmenities'>
                                    {!annonce.logement.animauxAutorises && !annonce.logement.fumeurAutorise && !annonce.logement.parkingDisponible && !annonce.logement.internetInclus && !annonce.logement.chargesIncluses && (
                                        <div style={{textAlign:"center",color:"#757575",fontSize:"14px"}}>❗Aucune commodité disponible</div>
                                    )}
                                    {annonce.logement.animauxAutorises&& (
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Animaux acceptés</div>
                                    </li>
                                    )}
                                    {annonce.logement.fumeurAutorise&& (
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Fumeur autorisé</div>
                                    </li>
                                    )}
                                    {annonce.logement.parkingDisponible&& (
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Parking Disponible</div>
                                    </li>
                                    )}
                                    {annonce.logement.internetInclus&& (
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Internet inclus</div>
                                    </li>
                                    )}
                                    {annonce.logement.chargesIncluses&& (
                                    <li>
                                        <FiberManualRecordIcon style={{fontSize:"12px",color:"#ff6b5c"}}/>
                                        <div>Charges inculses</div>
                                    </li>
                                    )}
                                </ul>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                Situé dans un quartier privilégié à seulement 5 minutes à pied du campus universitaire. Les commodités à proximité comprennent des épiceries, des cafés, des restaurants et les transports en commun.
                            </CustomTabPanel>
                        </Box>
                        <div className="buttonsBodyAppartment">
                            <button className="buttonBodyAppartment" 
                                onClick={()=>handelFavori(annonce.id)} 
                                disabled={isAlreadyFavori} 
                                style={{
                                    textTransform: 'none',
                                    opacity: isAlreadyFavori ? 0.5 : 1, 
                                    cursor: isAlreadyFavori ? 'not-allowed' : 'pointer'
                                }}                                
                            >
                                <Heart size="14px"/>
                                <div>Enregistrer</div>
                            </button>
                            <div className="buttonBodyAppartment">
                                <ShareIcon sx={{fontSize:"14px"}}/>
                                <div>Partager</div>
                            </div>
                            <div className="buttonBodyAppartment" onClick={handleOpenSignal}>
                                <Flag size="14px"/>
                                <div>Signaler</div>
                            </div>
                        </div>
                    
                </div>
            </div>
            <div className="infoPropCard">
                <div className="topInfoCard">
                    <div className="pdpProp" style={{cursor:'pointer'}} onClick={()=> handleNavigateProfilOwner()}>
                        <img  style={{width:"100%",height:"100%"}} src={annonce.proprietaire.avatarUrl || defaultAvatar} alt="" />
                        
                    </div>
                    <div className="cordonneesProp">
                        <div className="nameProp" style={{cursor:'pointer'}}onClick={()=> handleNavigateProfilOwner()}>
                            <div style={{fontSize: "14px",color:"black",fontWeight:"700"}}>{annonce.proprietaire.nom} {annonce.proprietaire.prenom}</div>
                            <Flag  className='iconInfo'/>
                        </div>
                        <div className="evaluationProp">
                            <StarIcon sx={{fontSize:"18px",color:"#ffa000"}}/>
                            <div style={{fontSize: "12px"}}>{annonce.proprietaire.noteGlobale}</div>
                        </div>
                    </div>
                </div>
                <div className="availableProp">
                    <Mail  className='iconInfo'/>
                    <div style={{fontSize: "13px"}}>{annonce.proprietaire.email}</div>
                </div>
                <div className="availableProp">
                    <Phone   className='iconInfo'/>
                    <div style={{fontSize: "13px"}}>{annonce.proprietaire.telephone}</div>
                </div>                
                <div className="btnContactContainer" style={{display:"flex",justifyContent:"center",width:"100%"}}>
                    <div className="cntctBtn" onClick={handleOpenDemandeLocation}>
                        <Send style={{color:"white",width:"15px"}} />
                        <button style={{fontSize:"13px",color:"white",cursor:"pointer"}}>Envoyer une demande de location</button>
                    </div>
                </div>
                <div style={{textAlign:"center",fontSize:"11px",color:"#757575"}}>Vous devez être connecté en tant qu'étudiant pour envoyer une demande de location.</div>
            </div>
        </div>
    );
}