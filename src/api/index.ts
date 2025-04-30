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

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
}

export async function addUserIntoApi(
  pseudo: string,
  email: string,
  password: string,
  confirmPassword: string,
  avatar: File | null
): Promise<null | IUser> {
  try {

    
    //* Créer un FormData pour envoyer les données textuelles et l'avatar
    const formData = new FormData();
    formData.append('pseudo', pseudo);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    

    //* Ajouter l'avatar seulement s'il existe
    if (avatar) {
      formData.append('avatar', avatar);
      console.log(avatar);
    }
    
    const result = await fetch("http://localhost:3000/users", {
      method: 'POST',
      body: formData
      //* Le Content-Type, sera automatiquement défini à multipart/form-data
    });

    if (result.ok) {
      const newUser: IUser = await result.json();
      return newUser;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur", error);
    return null;
  }   
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

/* export async function getTopPlayersBySubmission(limit: number = 10): Promise<IUser> {

  const players = await getPlayers();

  const sortedPlayers = players.sort((a, b) => {
    return b.users.length - a.users.length;
  });

  return sortedPlayers.slice(0, limit)

} */
