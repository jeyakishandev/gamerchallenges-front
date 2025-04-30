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

/* export async function getTopUsersByCompletedChallenges(limit: number = 10): Promise<IUser[]> {
  // Récupération de tous les challenges qui contiennent les utilisateurs
  const challenges = await getChallenges();
  
  // Création d'un Map pour compter les challenges complétés par utilisateur
  const userChallengeCount = new Map<number, { user: IUser; count: number }>();
  
  // Parcourir tous les challenges et comptabiliser pour chaque utilisateur
  challenges.forEach(challenge => {
    challenge.users.forEach(user => {
      if (userChallengeCount.has(user.id)) {
        // Incrémenter le compteur pour cet utilisateur
        const userData = userChallengeCount.get(user.id)!;
        userData.count += 1;
      } else {
        // Ajouter l'utilisateur avec un compteur à 1
        userChallengeCount.set(user.id, { user, count: 1 });
      }
    });
  });
  
  // Convertir le Map en tableau et trier par nombre de challenges complétés (ordre décroissant)
  const sortedUsers = Array.from(userChallengeCount.values())
    .sort((a, b) => b.count - a.count)
    .map(userData => userData.user);
  
  // Retourner les 10 premiers utilisateurs
  return sortedUsers.slice(0, limit);
} */