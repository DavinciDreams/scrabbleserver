export interface Player {
  id: string;
  name: string;
  tiles: string[];
  score: number;
  isHost: boolean;
  joinedAt: Date;
}