export type IChallenges = IChallenge[];

export interface IChallenge {
  id: number;
  name: string;
  description: string;
  video_url: string;
  category_id: number;
  difficulty_id: number;
  users: IUser[];
  category: ICategory;
  difficulty: IDifficulty;
}

export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: number;
  difficulty_id: number;
  submission: ISubmission[];
}

export interface ISubmission {
  user_id: number;
  challenge_id: number;
  video_url: string;
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