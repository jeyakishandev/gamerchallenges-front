export type IChallenges = IChallenge[];

export interface IChallenge {
  id: number;
  name: string;
  description: string;
  video_url: string;
  category_id: number;
  difficulty_id: number;
  user_id: number;
  users: IUser[];
  category: ICategory;
  difficulty: IDifficulty;
  Submission?: ISubmission
}

export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
  difficulty_id: number;
  challenges: IChallenge[];
  Submission: ISubmission;
}

export interface ISubmission {
  user_id: number;
  challenge_id: number;
  video_url: string;
  created_at: string;
  name: string;
  category: ICategory;
  difficulty: IDifficulty;
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export interface IDifficulty {
  id: number;
  name: string;
  color: string;
}

