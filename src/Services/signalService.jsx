import authAxios from "./AuthService";
export const signalAnnonce = async(annonceSignaleeId,motif,description)=>{
  const response = await authAxios.post('/Signalement/signaler', {
    annonceSignaleeId,
    motif,
    description,
  });
  return response.data;
}
