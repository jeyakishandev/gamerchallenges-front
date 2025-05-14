import type { IChallenges, IChallenge, IUser } from "../@types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getChallenges(): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/challenges`);
  const challenges = await response.json();
  return challenges;
}

export async function getChallengeById(id: number): Promise<IChallenge> {
  const response = await fetch(
    `${baseUrl}/challenges/${id}`
  );
  const challenge = await response.json();
  return challenge;
}

export async function getChallengesByUser(id: number): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/users/${id}/challenges`);
  if (!response.ok) {
    throw new Error("Impossible de récupérer les challenges créés par l'utilisateur.");
  }
  return await response.json();
}

export async function getChallengesCreatedByUser(userId: number): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/challenges/user/${userId}`);
  return await response.json();
}

export async function getUsers(): Promise<IUser[]> {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();
  return users;
}

export async function loginUser(pseudoOrEmail: string, password: string): Promise<{ token: string; userId: number}> {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudoOrEmail, password })
  })
  
  if (!response.ok) {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  return response.json();
}

export async function getUserById(userId: number, token?: string): Promise<IUser> {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response  = await fetch(`${baseUrl}/users/${userId}`, {
    method: "GET",
    headers,
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
    
    const result = await fetch(`${baseUrl}/users`, {
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

export async function updateUserIntoApi(
  id: number,
  token: string,
  avatar: File | null,
  pseudo?: string,
  email?: string,
): Promise<null | IUser> {

  try {

    const formData = new FormData();
    if (pseudo !== undefined) formData.append('pseudo', pseudo);
    if (email !== undefined) formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    const result = await fetch(`${baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.ok) {
      const updatedUser: IUser = await result.json();
      console.log("Réponse de l'API après mise à jour :", updatedUser);
      return updatedUser;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profile", error);
    return null;
  }  
}

export async function addSubmissionToChallenge(challengeId: number, videoUrl: string, token: string) {
  const response = await fetch(`${baseUrl}/challenges/${challengeId}/submissions`, {
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

export async function updateUserSubmission(userId: number, challengeId: number, videoUrl: string, token: string) {
  const response = await fetch(`${baseUrl}/users/${userId}/submissions/${challengeId}`, {
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

export async function deleteUserSubmission(userId: number, challengId: number, token: string) {
  const response = await fetch(`${baseUrl}/users/${userId}/submissions/${challengId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if(!response.ok) {
    console.error(response);
    return null;
  }
  return true;
}

export async function updateChallenge(
  id: number,
  data: object,
  token: string

): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/challenges/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la modification");
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur API updateChallenge :", err);
    throw err; // On relance l’erreur pour la catch dans le form
  }
}
