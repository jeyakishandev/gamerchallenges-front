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
    // Si un avatar est fourni, nous devons l'uploader d'abord
    let avatarUrl = null;

    if (avatar) {
      // Créer un FormData pour uploader le fichier
      const formData = new FormData();
      formData.append('file', avatar);
      
      // Endpoint pour upload de fichiers
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: 'POST',
        body: formData
      });
      
      if (!uploadResponse.ok) {
        throw new Error("Erreur lors de l'upload de l'avatar");
      }
      
      const uploadResult = await uploadResponse.json();
      avatarUrl = uploadResult.fileUrl; // Récupérer l'URL retournée par l'API
    }
    
    // Maintenant créer l'utilisateur avec l'URL de l'avatar si disponible
    const userData = {
      pseudo,
      email,
      password,
      confirmPassword,
      avatar_url: avatarUrl
    };
    
    const result = await fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
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

/* export async function getTopPlayersBySubmission(limit: number = 10): Promise<IUser> {

  const players = await getPlayers();

  const sortedPlayers = players.sort((a, b) => {
    return b.users.length - a.users.length;
  });

  return sortedPlayers.slice(0, limit)

} */
