import { getChallengesByUser } from "../api";

const userId = 77; // l'id de l'utilisateur sélectionné
const userChallenges = await getChallengesByUser(userId);
console.log(userChallenges);