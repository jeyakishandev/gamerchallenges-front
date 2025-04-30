import type { IChallenge, IUser } from "../@types";

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