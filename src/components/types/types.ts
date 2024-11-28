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

export type TPageLimit = TQuery & {
  _page: number;
  _limit: number;
};

export type TAuthor = {
  id: number;
  name: string;
};

export type TLocation = {
  id: number;
  location: string;
};

export type TData = {
  authorId: number;
  authorName: string;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};