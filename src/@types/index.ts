export interface IChallenge {
  id: number;
  name: string;
  description: string;
  videoId: string;
  category_id: number;
  difficulty_id: number;
  submissions: [];
}

export interface IUsers {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: number;
  difficulty_id: number;
  submissions: [];
}

export interface ISubmission {
  user_id: number;
  challenge_id: number;
  video_url: string;
}