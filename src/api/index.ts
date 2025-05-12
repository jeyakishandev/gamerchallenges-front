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
  return challenge;
}

export async function getChallengesByUser(id: number): Promise<IChallenges> {
  const response = await fetch(`http://localhost:3000/users/${id}/challenges`);
  const challenges = await response.json();
  return challenges;
}

export async function getSubmissionsByUser(id: number): Promise<IChallenge> {
  const response = await fetch(`http://localhost:3000/users/${id}/submissions`);
  const submissions = await response.json();
  return submissions;
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
}

export async function loginUser(pseudoOrEmail: string, password: string): Promise<{ token: string; userId: number}> {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudoOrEmail, password })
  })
  
  if (!response.ok) {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  return response.json();
}

export async function getUserById(userId: number, token: string): Promise<IUser> {
  const response  = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}`},
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les informations de l'utilisateur.");
  }
  return response.json();
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

export async function getProfileUsers(id: number) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const users = await response.json();
  return users;
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

export async function addSubmissionToChallenge(challengeId: number, videoUrl: string, token: string) {
  const response = await fetch(`http://localhost:3000/challenges/${challengeId}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ video_url: videoUrl }),
  })
  if (!response.ok) {
    console.error(response);
    return null;
  }
  return await response.json();
}

export async function updateUserSubmission(userId: number, challengeId: number, videoUrl: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/users/${userId}/submissions/${challengeId}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify({ video_url: videoUrl }),
  })
  if (!response.ok) {
    console.error(response);
    return null;
  }
  return await response.json()
}

export async function updateChallenge(
  id: number,
  data: object,
  token: string
): Promise<any> {
  const response = await fetch(`http://localhost:3000/challenges/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erreur lors de la modification");

  return await response.json();
}
