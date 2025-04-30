import type { IChallenges, IChallenge, IUser } from "../@types";

export async function getChallenges(): Promise<IChallenges> {
  const response = await fetch("http://localhost:3000/challenges");
  const challenges = await response.json();
  return challenges;
}

export async function getChallengeById(id: number): Promise<IChallenge> {
  const response = await fetch(
    `http://localhost:3000/challenges/${id}`
  );
  const challenge = await response.json();
  console.log(challenge);
  return challenge;
}

export async function getPlayers(): Promise<IUser> {
  const response = await fetch("http://localhost:3000/users");
  const players = await response.json();
  return players
}

export async function getTopChallengesByParticipation(limit: number = 10): Promise<IChallenges> {
  // Récupération de tous les challenges
  const challenges = await getChallenges();
  
  // Tri des challenges par nombre de participants (ordre décroissant)
  const sortedChallenges = challenges.sort((a, b) => {
    return b.users.length - a.users.length;
  });
  
  // Retourne les 10 premiers challenges
  return sortedChallenges.slice(0, limit);
}


// Fonction qui permets de récupérer les 10 meilleurs joueurs, et les trier de manière décroissante
export async function getTopUsers(limit: number = 10): Promise<IUser[]> {
  
  // Récupère tous les users 
  const response = await fetch("http://localhost:3000/users");
  const players = await response.json();
  
  // Tri les users par nombre de challenges complétés (ordre décroissant)
  const sortedPlayers = players.sort((a: IUser, b: IUser) => {
    return b.challenges.length - a.challenges.length;
  });

  // Retourne les 10 meilleurs joueurs
  return sortedPlayers.slice(0, limit);
}
