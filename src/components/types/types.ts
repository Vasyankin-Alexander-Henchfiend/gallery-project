export type TPicture = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

export type TQuery = {
  q?: string;
  authorId?: string;
};

export type TPageLimit = TQuery&{
  _page: number;
  _limit: number;
};

export enum ElementStates {
  Closed = "closed",
  Open = "open",
}