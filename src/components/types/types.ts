export type TPicture = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

export type TPageLimit = {
  q?: string;
  authorId?: string;
};

export type TQuery = TPageLimit & {
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

export type TDataForDatalist = {
  id: string | number;
  label: string | number;
}