export interface IChallenge {
  id: number;
  name: string;
  description: string;
  videoId: string;
  user: IUser[];
  category_id: number;
  difficulty_id: number;
  submissions: ISubmission[];
}

export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
  difficulty_id: number;
  submissions: ISubmission[];
}

export interface ISubmission {
  user_id: number;
  challenge_id: number;
  video_url: string;
}